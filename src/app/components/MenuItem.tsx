'use client';
import { Card, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

interface MenuItemProps {
    title: string;
    description: string;
    price: number;
    image: string;
    id: number;
}

const MenuItem = ({ title, description, price, image, id }: MenuItemProps) => {
    const [loading, setLoading] = useState(false);
    return (
        <Link href={`/product/${id}`} passHref onClick={() => setLoading(true)}>
            <Card
                sx={{
                    display: 'flex',
                    mb: 2,
                    borderRadius: 2,
                    cursor: 'pointer',
                    alignItems: 'center',
                    pl: 2,
                    boxShadow: 'none',
                    transition: 'box-shadow 0.3s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    },
                    height: 250
                }}
            >
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                        <CircularProgress />
                    </div>
                ) : (
                    <>
                        <CardMedia
                            component="img"
                            sx={{ width: 100, height: 100, borderRadius: 2 }}
                            image={image || '/img/not_found_image.png'}
                            alt={title}
                        />
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h6" component="div">
                                {title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {description.length > 50 ? description.slice(0, 50) + '...' : description}
                            </Typography>
                            <Typography variant="body1" color="success.main" fontWeight="bold">
                                R$ {price.toFixed(2)}
                            </Typography>
                        </CardContent>
                    </>
                )}
            </Card>
        </Link>
    );
};

export default MenuItem;
