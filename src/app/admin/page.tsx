'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Container,
    Grid,
    Paper,
    IconButton,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    CircularProgress
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, ExitToApp as LogoutIcon } from '@mui/icons-material';
import productsService from '../../../services/productsService';
import categoriesService from '../../../services/categoriesService';
import Image from 'next/image';

interface Product {
    id: number;
    nome: string;
    preco: number;
    categoria_id: number;
    descricao?: string;
    imagem?: File | null;
    imagem_url?: string;
}

interface Category {
    id: number;
    nome: string;
}

interface ProductFormData {
    nome: string;
    preco: string;
    categoria_id: number;
    descricao?: string;
    imagem?: File | null;
    imagem_url?: string;
}

export default function Admin() {
    const { user, logout, isLoading } = useAuth();
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
    const [deleteDialog, setDeleteDialog] = useState({ open: false, type: '', id: 0 });
    const [loading, setLoading] = useState(false);
    const [productDialog, setProductDialog] = useState({ open: false, type: 'create' as 'create' | 'edit', productId: 0 });
    const [productForm, setProductForm] = useState<ProductFormData>({
        nome: '',
        preco: '',
        categoria_id: 0,
        descricao: '',
        imagem: null,
        imagem_url: ''
    });

    const showSnackbar = useCallback(
        (message: string, severity: 'success' | 'error' = 'success') => {
            setSnackbar({ open: true, message, severity });
        },
        [setSnackbar]
    );

    const fetchData = useCallback(async () => {
        try {
            const [categoriesResponse, productsResponse] = await Promise.all([
                categoriesService.getAllCategories(),
                productsService.getAllProducts('', null)
            ]);
            setCategories(categoriesResponse.data);
            setProducts(productsResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            showSnackbar('Erro ao carregar dados', 'error');
        }
    }, [setCategories, setProducts, showSnackbar]);

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
            return;
        }
        if (user) {
            fetchData();
        }
    }, [user, router, isLoading, fetchData]);

    const handleDelete = async () => {
        try {
            if (deleteDialog.type === 'categoria') {
                await categoriesService.deleteCategory(deleteDialog.id);
            } else {
                await productsService.deleteProduct(deleteDialog.id);
            }
            fetchData();
            showSnackbar('Item excluído com sucesso', 'success');
        } catch (error) {
            console.error('Error deleting item:', error);
            showSnackbar('Erro ao excluir item', 'error');
        } finally {
            setDeleteDialog({ open: false, type: '', id: 0 });
        }
    };

    const handleProductDialogOpen = async (type: 'create' | 'edit', productId?: number) => {
        if (type === 'edit' && productId) {
            try {
                const response = await productsService.getProductById(productId);
                setProductForm({
                    nome: response.data.nome,
                    preco: response.data.preco.toString(),
                    categoria_id: response.data.categoria_id,
                    descricao: response.data.descricao,
                    imagem_url: response.data.imagem_url
                });
                setProductDialog({ open: true, type, productId });
            } catch (error) {
                console.error('Error loading product:', error);
                showSnackbar('Erro ao carregar produto', 'error');
            }
        } else {
            setProductForm({ nome: '', preco: '', categoria_id: 0, descricao: '' });
            setProductDialog({ open: true, type: 'create', productId: 0 });
        }
    };

    const handleProductSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('nome', productForm.nome);
            formData.append('preco', productForm.preco);
            formData.append('categoria_id', productForm.categoria_id.toString());
            if (productForm.descricao) {
                formData.append('descricao', productForm.descricao);
            }
            if (productForm.imagem) {
                formData.append('imagem', productForm.imagem);
            }

            if (productDialog.type === 'create') {
                await productsService.createProduct(formData);
                showSnackbar('Produto criado com sucesso', 'success');
            } else {
                await productsService.updateProduct(productDialog.productId, formData);
                showSnackbar('Produto atualizado com sucesso', 'success');
            }

            fetchData();
            setProductDialog({ open: false, type: 'create', productId: 0 });
            setProductForm({ nome: '', preco: '', categoria_id: 0, descricao: '', imagem: null });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error submitting product:', error);
                showSnackbar(error.message || 'Erro ao salvar produto', 'error');
            } else {
                console.error('Unknown error:', error);
                showSnackbar('Erro desconhecido', 'error');
            }
        }
    };

    const redirectToCategories = () => {
        router.push('/admin/categories');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Painel Administrativo
                    </Typography>
                    <Button
                        disabled={loading}
                        color="inherit"
                        onClick={() => {
                            redirectToCategories();
                            setLoading(true);
                        }}
                    >
                        Gerenciar categorias
                        {loading && <CircularProgress sx={{ ml: 1 }} color="inherit" />}
                    </Button>
                    <IconButton disabled={loading} color="inherit" onClick={logout}>
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                <Typography variant="h6">Produtos</Typography>
                                <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleProductDialogOpen('create')}>
                                    Novo Produto
                                </Button>
                            </Box>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nome</TableCell>
                                            <TableCell>Preço</TableCell>
                                            <TableCell>Imagem</TableCell>
                                            <TableCell align="right">Ações</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {products.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell>{product.nome}</TableCell>
                                                <TableCell>R$ {product.preco}</TableCell>
                                                <TableCell>
                                                    <Image
                                                        src={product.imagem_url || '/img/not_found_image.png'}
                                                        alt="Imagem do Produto"
                                                        width={100}
                                                        height={100}
                                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                        unoptimized={true}
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <IconButton size="small" onClick={() => handleProductDialogOpen('edit', product.id)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => setDeleteDialog({ open: true, type: 'produto', id: product.id })}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            {/* Product Form Dialog */}
            <Dialog open={productDialog.open} onClose={() => setProductDialog({ ...productDialog, open: false })}>
                <DialogTitle>{productDialog.type === 'create' ? 'Novo Produto' : 'Editar Produto'}</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Nome"
                            value={productForm.nome}
                            onChange={(e) => setProductForm({ ...productForm, nome: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Descrição"
                            value={productForm.descricao}
                            onChange={(e) => setProductForm({ ...productForm, descricao: e.target.value })}
                            margin="normal"
                            multiline
                            rows={3}
                        />
                        <TextField
                            fullWidth
                            label="Preço"
                            type="number"
                            value={productForm.preco}
                            onChange={(e) => setProductForm({ ...productForm, preco: e.target.value })}
                            margin="normal"
                            inputProps={{ step: '0.01' }}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setProductForm({ ...productForm, imagem: e.target.files[0] });
                                }
                            }}
                        />
                        {productForm.imagem_url !== '' && (
                            <Image
                                src={productForm.imagem_url || '/img/not_found_image.png'}
                                alt="Imagem do Produto"
                                width={100}
                                height={100}
                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                unoptimized={true}
                            />
                        )}
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Categoria</InputLabel>
                            <Select
                                value={productForm.categoria_id}
                                onChange={(e) => setProductForm({ ...productForm, categoria_id: Number(e.target.value) })}
                                label="Categoria"
                            >
                                <MenuItem value={0} disabled>
                                    Selecione uma categoria
                                </MenuItem>
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setProductDialog({ ...productDialog, open: false })}>Cancelar</Button>
                    <Button onClick={handleProductSubmit} variant="contained">
                        {productDialog.type === 'create' ? 'Criar' : 'Salvar'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ ...deleteDialog, open: false })}>
                <DialogTitle>Confirmar exclusão</DialogTitle>
                <DialogContent>
                    <Typography>Tem certeza que deseja excluir este {deleteDialog.type}?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog({ ...deleteDialog, open: false })}>Cancelar</Button>
                    <Button onClick={handleDelete} color="error">
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <Alert severity={snackbar.severity} sx={{ width: '100%', whiteSpace: 'pre-line' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
