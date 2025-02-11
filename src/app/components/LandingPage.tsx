import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography
} from '@mui/material';
import { Smartphone, BarChart, AccessTime as Clock, RestaurantMenu as ChefHat, Check, ArrowForward } from '@mui/icons-material';

const features = [
    {
        title: 'Cardápio Digital Intuitivo',
        description: 'Interface moderna e fácil de usar para seus clientes fazerem pedidos',
        icon: Smartphone
    },
    {
        title: 'Painel Administrativo Completo',
        description: 'Gerencie pedidos, cardápio e análise métricas importantes',
        icon: BarChart
    },
    {
        title: 'Atualização em Tempo Real',
        description: 'Atualize preços e disponibilidade instantaneamente',
        icon: Clock
    },
    {
        title: 'Gestão de Cardápio Simplificada',
        description: 'Organize categorias, itens e variações com facilidade',
        icon: ChefHat
    }
];

const pricing = [
    {
        id: 1,
        title: 'Mensal',
        price: 'R$ 99',
        period: '/mês',
        features: [
            'Cardápio Digital',
            'Painel Administrativo',
            'Suporte',
            'Atualização em Tempo Real',
            'Gestão de Cardápio',
            'Pedidos ilimitados',
            'Produtos ilimitados'
        ]
    },
    {
        id: 2,
        title: 'Semestral',
        price: 'R$ 99',
        period: '/semestre',
        features: [
            'Cardápio Digital',
            'Painel Administrativo',
            'Suporte',
            'Atualização em Tempo Real',
            'Gestão de Cardápio',
            'Pedidos ilimitados',
            'Produtos ilimitados'
        ],
        highlighted: true
    },
    {
        id: 3,
        title: 'Anual',
        price: 'R$ 99',
        period: '/ano',
        features: [
            'Cardápio Digital',
            'Painel Administrativo',
            'Suporte',
            'Atualização em Tempo Real',
            'Gestão de Cardápio',
            'Pedidos ilimitados',
            'Produtos ilimitados'
        ]
    }
];

const LandingPage = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '100vh', // Pode ajustar conforme necessário
                backgroundImage: 'url(/img/background-home.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Camada branca semi-transparente apenas sobre a imagem */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.93)', // Cor branca com opacidade de 60%
                    zIndex: 1 // Isso garante que a camada de cor fique sobre a imagem
                }}
            />

            {/* Conteúdo acima da camada branca */}
            <Box sx={{ position: 'relative', zIndex: 2 }}>
                {/* Hero Section */}
                <Container maxWidth="lg" sx={{ pt: 12, pb: 8, textAlign: 'center' }}>
                    <Typography
                        variant="overline"
                        fontSize="1rem"
                        component="span"
                        sx={{
                            display: 'inline-block',
                            bgcolor: '#8803FC',
                            px: 2,
                            py: 0.5,
                            borderRadius: 50,
                            mb: 4
                        }}
                    >
                        Modernize seu restaurante
                    </Typography>
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 'bold',
                            mb: 3,
                            background: 'linear-gradient(45deg, #2D3648, #576AFC)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Cardápio Digital Inteligente
                    </Typography>
                    <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
                        Transforme a experiência dos seus clientes com um cardápio digital moderno e intuitivo. Gerencie pedidos e métricas
                        em tempo real.
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                        <Button variant="contained" sx={{ bgcolor: '#03BEFC' }} size="large" endIcon={<ArrowForward />} href="/checkout">
                            Começar Agora
                        </Button>
                        <Button variant="outlined" size="large">
                            Veja uma demonstração
                        </Button>
                    </Stack>
                </Container>

                {/* Features Section */}
                <Box sx={{ bgcolor: 'grey.50', py: 8, my: 8, borderRadius: 4 }}>
                    <Container maxWidth="lg">
                        <Typography variant="h3" component="h2" align="center" sx={{ mb: 2 }} color="#576AFC">
                            Tudo que você precisa
                        </Typography>
                        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 8 }}>
                            Gerencie seu cardápio digital com ferramentas poderosas e intuitivas
                        </Typography>
                        <Grid container spacing={4}>
                            {features.map((feature) => (
                                <Grid item xs={12} md={6} lg={3} key={feature.title}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: 'column',
                                            '&:hover': { boxShadow: 6 },
                                            transition: 'box-shadow 0.3s'
                                        }}
                                    >
                                        <CardContent sx={{ textAlign: 'center' }}>
                                            <feature.icon sx={{ fontSize: 48, color: '#576AFC', mb: 2 }} />
                                            <Typography variant="h6" component="h3" gutterBottom>
                                                {feature.title}
                                            </Typography>
                                            <Typography color="text.secondary">{feature.description}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                {/* Pricing Section */}
                <Container maxWidth="lg" sx={{ py: 8 }}>
                    <Typography variant="h3" component="h2" align="center" sx={{ mb: 2 }} color="#576AFC">
                        Faça o pedido agora
                    </Typography>
                    <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 8 }}>
                        Escolha o plano ideal para o seu negócio
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {pricing.map((plan) => (
                            <Grid item xs={12} md={4} key={plan.title}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        ...(plan.highlighted && {
                                            bgcolor: '#3603FC',
                                            color: 'white'
                                        })
                                    }}
                                    raised={plan.highlighted}
                                >
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="h5" component="h3" gutterBottom>
                                            {plan.title}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                                            <Typography variant="h4" component="span">
                                                {plan.price}
                                            </Typography>
                                            <Typography variant="subtitle1" component="span" sx={{ ml: 1 }}>
                                                {plan.period}
                                            </Typography>
                                        </Box>
                                        <List>
                                            {plan.features.map((feature) => (
                                                <ListItem key={feature} disableGutters>
                                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                                        <Check
                                                            sx={{
                                                                color: plan.highlighted ? 'white' : 'success.main'
                                                            }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={feature}
                                                        sx={{
                                                            '& .MuiListItemText-primary': {
                                                                color: plan.highlighted ? 'white' : 'inherit'
                                                            }
                                                        }}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                bgcolor: plan.highlighted ? '#fff' : '#7b58ff',
                                                color: plan.highlighted ? '#7b58ff' : '#fff'
                                            }}
                                            fullWidth
                                            href={`/checkout?plan=${plan.id}`}
                                        >
                                            Selecionar Plano
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>

                {/* CTA Section */}
                <Container maxWidth="lg" sx={{ py: 8 }}>
                    <Box
                        sx={{
                            bgcolor: '#7b58ff',
                            borderRadius: 4,
                            p: 6,
                            textAlign: 'center'
                        }}
                    >
                        <Typography variant="h3" component="h2" sx={{ mb: 2 }}>
                            Pronto para modernizar seu restaurante?
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                            Junte-se a centenas de restaurantes que já estão usando nosso cardápio digital
                        </Typography>
                        <Button variant="contained" sx={{ bgcolor: '#fff', color: '#7b58ff' }} size="large" endIcon={<ArrowForward />} href="/checkout">
                            Começar Agora
                        </Button>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default LandingPage;
