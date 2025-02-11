'use client';
export const domain = process.env.NEXT_PUBLIC_DOMAIN;
import { Box, Container, Typography } from '@mui/material';
import Header from './Header';
import CategoryCard from './/CategoryCard';
import MenuItem from './/MenuItem';
import categoriesService from '../../../services/categoriesService';
import productsService from '../../../services/productsService';
import { useEffect, useState } from 'react';

type Category = {
    id: number;
    nome: string;
};

type Product = {
    id: number;
    nome: string;
    descricao: string;
    preco: string;
    imagem_url: string;
};
const HomeMenu = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [productName, setProductName] = useState('');
    const [categoryId, setCategoryId] = useState<number | null>(null);

    useEffect(() => {
        async function fetchCategories() {
            const data = await categoriesService.getAllCategories();
            setCategories(data.data);
        }
        fetchCategories();
    }, []);

    useEffect(() => {
        async function fetchProducts() {
            const data = await productsService.getAllProducts(productName, categoryId);
            setProducts(data.data);
        }
        fetchProducts();
    }, [productName, categoryId]);

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Header productName={productName} setProductName={setProductName} />
            <Container sx={{ mt: 3 }}>
                <Box sx={{ mb: 3 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 2
                        }}
                    >
                        <Typography variant="h6" color="text.primary">
                            Categorias
                        </Typography>
                        <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                            Ver mais
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
                        <CategoryCard id={null} title={'Todas'} setCategoryId={setCategoryId} categoryId={categoryId} />
                        {categories?.map((category) => (
                            <CategoryCard
                                key={category.id}
                                id={category.id}
                                title={category.nome}
                                categoryId={categoryId}
                                setCategoryId={setCategoryId}
                            />
                        ))}
                    </Box>
                </Box>

                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 2
                        }}
                    >
                        <Typography variant="h6" color="text.primary">
                            Cardápio
                        </Typography>
                        <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                            Ver mais
                        </Typography>
                    </Box>
                    {products?.map((product) => (
                        <MenuItem
                            id={product.id}
                            key={product.id}
                            title={product.nome}
                            description={product.descricao}
                            price={parseFloat(product.preco)}
                            image={product.imagem_url}
                        />
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default HomeMenu;
