'use client';
import { useEffect, useState } from 'react';
import { Box, Container, Typography, IconButton, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useRouter, useParams } from 'next/navigation';
import productsService from '../../../../services/productsService';
import carService from '../../../../services/carService';
import Cookies from 'js-cookie';
import Header from '@/app/components/Header';

// interface AdditionalItem {
//     name: string;
//     price: number;
//     quantity: number;
// }

interface Product {
    id: number;
    nome: string;
    descricao: string;
    preco: string;
    imagem_url: string;
}

const ProductPage = () => {
    const [quantity, setQuantity] = useState(1);
    // const [additionals, setAdditionals] = useState<AdditionalItem[]>([
    //     { name: 'Alface', price: 0.0, quantity: 0 },
    //     { name: 'Bacon', price: 3.5, quantity: 1 }
    // ]);
    const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const params = useParams();

    const handleBack = () => {
        router.push('/');
    };

    const handleQuantityChange = (value: number) => {
        if (quantity + value >= 1) {
            setQuantity(quantity + value);
        }
    };

    // const handleAdditionalChange = (index: number, value: number) => {
    //     const newAdditionals = [...additionals];
    //     if (newAdditionals[index].quantity + value >= 0) {
    //         newAdditionals[index].quantity += value;
    //         setAdditionals(newAdditionals);
    //     }
    // };

    // const totalPrice = 26.0 + additionals.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const createCar = async () => {
        try {
            const data = {
                produto_id: Number(params.id),
                quantidade: quantity,
                session_id: Cookies.get('session')
            };
            const response = await carService.createCar(data);
            if (response) {
                router.push('/car');
            }
        } catch (error) {
            console.error('Erro ao criar carrinho:', error);
        }
    };
    useEffect(() => {
        const fetchProduct = async () => {
            const id = params.id;
            if (!id) return;
            const product = await productsService.getProductById(Number(id));
            setProduct(product.data);
        };
        fetchProduct();
    }, [params.id]);

    return (
        <>
            <Header productName={null} setProductName={() => {}} />
            <Box sx={{ backgroundColor: '#f5f5f5', pt: 2, height: '100vh' }}>
                <Container
                    maxWidth="sm"
                    sx={{
                        pt: 2,
                        pb: 8,
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        boxShadow: 2
                    }}
                >
                    <Box sx={{ position: 'relative', mb: 2 }}>
                        <IconButton
                            onClick={handleBack}
                            sx={{
                                position: 'absolute',
                                top: 16,
                                left: 16,
                                zIndex: 1,
                                bgcolor: '#81b08f',
                                '&:hover': { bgcolor: '#537a5f' }
                            }}
                        >
                            <ArrowBackIcon sx={{ color: 'white' }} />
                        </IconButton>
                        <Box
                            component="img"
                            src={product?.imagem_url || '/img/not_found_image.png'}
                            alt={product?.nome}
                            sx={{
                                width: '100%',
                                height: 300,
                                objectFit: 'cover',
                                borderRadius: 2
                            }}
                        />
                    </Box>

                    <Typography variant="h4" component="h1" gutterBottom color="text.primary">
                        {product?.nome}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                        A partir de R$ {product?.preco}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        {product?.descricao}
                    </Typography>

                    {/* <Typography variant="h6" sx={{ mb: 2 }}>
        Adicionais
      </Typography>

      {additionals.map((item, index) => (
        <Card key={item.name} sx={{ mb: 2, boxShadow: 'none', bgcolor: 'grey.50' }}>
          <CardContent sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            '&:last-child': { pb: 2 }
          }}>
            <Box>
              <Typography variant="body1">{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                + R$ {item.price.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton 
                size="small" 
                onClick={() => handleAdditionalChange(index, -1)}
                sx={{ color: 'primary.main' }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography>{item.quantity}</Typography>
              <IconButton 
                size="small" 
                onClick={() => handleAdditionalChange(index, 1)}
                sx={{ color: 'primary.main' }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))} */}
                    {/* 
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Escolha a opção da carne
      </Typography>
      <Card sx={{ mb: 4, boxShadow: 'none', bgcolor: 'grey.50' }}>
        <CardContent>
          <Typography variant="body1">Mal passada</Typography>
        </CardContent>
      </Card> */}
                    <Box
                        sx={{
                            maxWidth: 'sm',
                            mx: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                border: 1,
                                borderColor: 'divider',
                                borderRadius: 1,
                                px: 1
                            }}
                        >
                            <IconButton size="small" onClick={() => handleQuantityChange(-1)} sx={{ color: 'primary.main' }}>
                                <RemoveIcon />
                            </IconButton>
                            <Typography sx={{ px: 2 }} color="text.primary">
                                {quantity}
                            </Typography>
                            <IconButton size="small" onClick={() => handleQuantityChange(1)} sx={{ color: 'primary.main' }}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                        <Button
                            disabled={loading}
                            variant="contained"
                            fullWidth
                            sx={{
                                bgcolor: '#81b08f',
                                '&:hover': { bgcolor: '#537a5f' }
                            }}
                            onClick={() => {
                                createCar();
                                setLoading(true);
                            }}
                        >
                            Adicionar • R$ {(parseFloat(product?.preco ?? '0') * quantity).toFixed(2)}
                        </Button>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default ProductPage;
