'use client';
import { Card, CardContent, CardMedia, Typography, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

interface MenuItemCarProps {
    title: string;
    description: string;
    priceItem: number;
    quantitySelected: number;
    image: string;
    onDelete: (id: number) => void;
    onUpdate: (productId: number, quantity: number, id: number) => void;
    productId: number;
    id: number;
}

const MenuItemCar = ({ title, description, priceItem, image, quantitySelected, onDelete, onUpdate, productId, id }: MenuItemCarProps) => {
    const [quantity, setQuantity] = useState(quantitySelected);
    const [price, setPrice] = useState(priceItem);

    const handleQuantityChange = (value: number) => {
        if (quantity + value >= 1) {
            setQuantity(quantity + value);
            setPrice((quantity + value) * priceItem);
            onUpdate(productId, quantity + value, id);
        }
    };

    return (
        <Card
            sx={{
                display: 'flex',
                mb: 2,
                boxShadow: 'none',
                borderRadius: 2,
                cursor: 'pointer'
            }}
        >
            <CardMedia
                component="img"
                sx={{ width: 150, height: 150, borderRadius: 2 }}
                image={image || '/img/not_found_image.png'}
                alt={title}
            />
            <CardContent sx={{ flex: 1 }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                    <DeleteIcon
                        style={{
                            cursor: 'pointer',
                            color: '#81b08f',
                            width: 30,
                            height: 30
                        }}
                        onClick={() => onDelete(id)}
                    />
                </div>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {description.length > 50 ? description.slice(0, 50) + '...' : description}
                </Typography>
                <Typography variant="body1" color="success.main" fontWeight="bold">
                    R$ {price.toFixed(2)}
                </Typography>
                <Typography variant="body1" color="text.secondary" fontWeight="bold">
                    Quantidade: {quantity}
                </Typography>
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
                </Box>
            </CardContent>
        </Card>
    );
};

export default MenuItemCar;
