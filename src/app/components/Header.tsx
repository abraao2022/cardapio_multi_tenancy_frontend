import { AppBar, IconButton, InputBase, Toolbar, Typography, alpha, styled, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/navigation';
import CardMedia from '@mui/material/CardMedia';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: '100%'
    }
}));

const Header = ({
    productName = null,
    setProductName = () => {}
}: {
    productName: string | null;
    setProductName: (productName: string) => void;
}) => {
    const router = useRouter();
    const redirect = () => {
        router.push('/car');
    };
    return (
        <AppBar position="static" sx={{ backgroundColor: '#81b08f', boxShadow: 'none', pb: 2 }}>
            <Toolbar>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        lg={4}
                        xl={4}
                        md={4}
                        sm={12}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: { xs: 'center', sm: 'center', md: 'center', lg: 'flex-start', xl: 'flex-start' }
                        }}
                    >
                        <Grid>
                            <Typography variant="h6" component="div" textAlign="center" sx={{ flexGrow: 1, fontWeight: 'normal' }}>
                                Olá,
                            </Typography>
                            <Typography variant="h5" component="div" textAlign="center" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                                Seja Bem-vindo(a)
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        lg={4}
                        xl={4}
                        md={4}
                        sm={12}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <CardMedia component="img" sx={{ width: 150, height: 150, mt: 0.5 }} image="/img/logo.png" alt="Logo" />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        lg={4}
                        xl={4}
                        md={4}
                        sm={12}
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: { xs: 'flex-start', sm: 'flex-start', md: 'flex-start', lg: 'flex-start', xl: 'flex-start' }
                        }}
                    >
                        <Grid>
                            <IconButton onClick={redirect}>
                                <ShoppingCartIcon fontSize="large" style={{ color: 'white' }} />
                            </IconButton>
                        </Grid>
                    </Grid>

                    {productName !== null && (
                        <Grid item xs={12} lg={12} xl={12} md={12} sm={12}>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Qual comida você está procurando?"
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={(e) => setProductName(e.target.value)}
                                    value={productName}
                                />
                            </Search>
                        </Grid>
                    )}
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
