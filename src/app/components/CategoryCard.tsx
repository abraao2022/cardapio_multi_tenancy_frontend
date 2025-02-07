'use client';
import { Box, Paper, Typography } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import MenuBookIcon from '@mui/icons-material/MenuBook';
interface CategoryCardProps {
    title: string;
    id: number | null;
    setCategoryId: (id: number | null) => void;
    categoryId: number | null;
}

const CategoryCard = ({ title, id, setCategoryId, categoryId }: CategoryCardProps) => {
    // Mapeamento de título para ícone
    const getIcon = (title: string) => {
        switch (title.toLowerCase()) {
            case 'fit':
                return <FitnessCenterIcon />;
            case 'emagrecimento':
                return <KebabDiningIcon />;
            case 'caseiro':
                return <RamenDiningIcon />;
            case 'especial':
                return <LocalDiningIcon />;
            default:
                return <MenuBookIcon />;
        }
    };

    const icon = getIcon(title); // Obter o ícone com base no título

    return (
        <Paper
            elevation={0}
            sx={{
                minWidth: 200,
                textAlign: 'center',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                borderRadius: 2,
                cursor: 'pointer',
                backgroundColor: id === categoryId ? '#3d5444' : '#fff'
            }}
            onClick={() => setCategoryId(id)}
        >
            <Box sx={{ color: id === categoryId ? '#fff' : '#3d5444' }}>{icon}</Box>
            <Typography variant="body2" color={id === categoryId ? '#fff' : 'text.primary'}>
                {title}
            </Typography>
        </Paper>
    );
};

export default CategoryCard;
