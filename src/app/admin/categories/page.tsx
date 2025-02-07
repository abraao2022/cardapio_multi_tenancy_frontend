'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
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
    CircularProgress
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, ExitToApp as LogoutIcon } from '@mui/icons-material';
import categoriesService from '../../../../services/categoriesService';

interface Category {
    id: number;
    nome: string;
}

interface CategoryFormData {
    nome: string;
}

export default function Categories() {
    const { user, logout, isLoading } = useAuth();
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
    const [deleteDialog, setDeleteDialog] = useState({ open: false, type: '', id: 0 });
    const [loading, setLoading] = useState(false);
    const [categoryDialog, setCategoryDialog] = useState({ open: false, type: 'create' as 'create' | 'edit', categoryId: 0 });
    const [categoryForm, setCategoryForm] = useState<CategoryFormData>({
        nome: ''
    });

    const showSnackbar = useCallback(
        (message: string, severity: 'success' | 'error' = 'success') => {
            setSnackbar({ open: true, message, severity });
        },
        [setSnackbar]
    );

    const fetchData = useCallback(async () => {
        try {
            const categoriesResponse = await categoriesService.getAllCategories();
            setCategories(categoriesResponse.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            showSnackbar('Erro ao carregar dados', 'error');
        }
    }, [setCategories, showSnackbar]);

    const handleDelete = async () => {
        try {
            if (deleteDialog.type === 'categoria') {
                await categoriesService.deleteCategory(deleteDialog.id);
            } else {
                await categoriesService.deleteCategory(deleteDialog.id);
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

    const handleCategoryDialogOpen = async (type: 'create' | 'edit', categoryId?: number) => {
        if (type === 'edit' && categoryId) {
            try {
                const response = await categoriesService.getCategoryById(categoryId);
                setCategoryForm({
                    nome: response.data.nome
                });
                setCategoryDialog({ open: true, type, categoryId });
            } catch (error) {
                console.error('Error fetching category:', error);
                showSnackbar('Erro ao carregar categoria', 'error');
            }
        } else {
            setCategoryForm({ nome: '' });
            setCategoryDialog({ open: true, type: 'create', categoryId: 0 });
        }
    };

    const handleCategorySubmit = async () => {
        try {
            const data = {
                nome: categoryForm.nome
            };

            if (categoryDialog.type === 'create') {
                await categoriesService.createCategory(data);
                showSnackbar('Categoria criada com sucesso', 'success');
            } else {
                await categoriesService.updateCategory(categoryDialog.categoryId, data);
                showSnackbar('Categoria atualizada com sucesso', 'success');
            }

            fetchData();
            setCategoryDialog({ open: false, type: 'create', categoryId: 0 });
            setCategoryForm({ nome: '' });
        } catch (error: unknown) {
            console.error('Error saving category:', error);
            if (error instanceof Error) {
                if (error.message.includes('Validation failed')) {
                    const errors = JSON.parse(error.message.replace('Validation failed: ', ''));
                    showSnackbar(errors, 'error');
                } else {
                    showSnackbar(error.message || 'Erro ao salvar categoria', 'error');
                }
            } else {
                showSnackbar('Erro ao salvar categoria', 'error');
            }
        }
    };

    const redirectToProducts = () => {
        router.push('/admin');
    };

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
            return;
        }
        if (user) {
            fetchData();
        }
    }, [user, router, isLoading, fetchData]);

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
                            redirectToProducts();
                            setLoading(true);
                        }}
                    >
                        Gerenciar produtos
                        {loading && <CircularProgress sx={{ ml: 1 }} color="inherit" />}
                    </Button>
                    <IconButton color="inherit" onClick={logout}>
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                <Typography variant="h6">Categorias</Typography>
                                <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleCategoryDialogOpen('create')}>
                                    Nova Categoria
                                </Button>
                            </Box>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nome</TableCell>
                                            <TableCell align="right">Ações</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {categories.map((category) => (
                                            <TableRow key={category.id}>
                                                <TableCell>{category.nome}</TableCell>
                                                <TableCell align="right">
                                                    <IconButton size="small" onClick={() => handleCategoryDialogOpen('edit', category.id)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => setDeleteDialog({ open: true, type: 'categoria', id: category.id })}
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

            {/* Category Form Dialog */}
            <Dialog open={categoryDialog.open} onClose={() => setCategoryDialog({ ...categoryDialog, open: false })}>
                <DialogTitle>{categoryDialog.type === 'create' ? 'Nova Categoria' : 'Editar Categoria'}</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Nome"
                            value={categoryForm.nome}
                            onChange={(e) => setCategoryForm({ ...categoryForm, nome: e.target.value })}
                            margin="normal"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCategoryDialog({ ...categoryDialog, open: false })}>Cancelar</Button>
                    <Button onClick={handleCategorySubmit} variant="contained">
                        {categoryDialog.type === 'create' ? 'Criar' : 'Salvar'}
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
