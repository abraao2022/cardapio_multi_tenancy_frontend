'use client';
import { useEffect, useState } from 'react';
import { Box, Container, Typography, IconButton, Button, Paper, Alert, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import carService from '../../../services/carService';
import addressService from '../../../services/addressService';
import Cookies from 'js-cookie';
import MenuItemCar from '../components/MenuItemCar';
import { Form, Formik } from 'formik';

interface Product {
    id: number;
    nome: string;
    descricao: string;
    preco: string;
    imagem_url: string;
}

interface Car {
    id: number;
    produto_id: number;
    quantidade: number;
    session_id: string;
    produto: Product;
}

interface ClientAddress {
    cep: string;
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
}

interface Order {
    observacao: string;
}

interface Client {
    nome: string;
    telefone: string;
    address: ClientAddress;
    order: Order;
}

const CarPage = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [client, setClient] = useState<Client>({
        nome: '',
        telefone: '',
        order: {
            observacao: ''
        },
        address: {
            cep: '',
            rua: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: ''
        }
    });

    const validationSchema = Yup.object({
        name: Yup.string().required('Nome é obrigatório'),
        phone: Yup.string().required('Telefone é obrigatório'),
        street: Yup.string().required('Rua é obrigatória'),
        number: Yup.string().required('Número é obrigatório'),
        observation: Yup.string(),
        cep: Yup.string().required('CEP é obrigatório'),
        complement: Yup.string(),
        neighborhood: Yup.string().required('Bairro é obrigatório'),
        city: Yup.string().required('Cidade é obrigatória'),
        state: Yup.string().required('Estado é obrigatório')
    });

    const router = useRouter();
    const sessionId = Cookies.get('session');

    const handleBack = () => {
        router.back();
    };

    // const handleQuantityChange = (value: number) => {
    //     if (quantity + value >= 1) {
    //         setQuantity(quantity + value);
    //     }
    // };

    const handleDelete = async (id: number) => {
        try {
            if (!sessionId) return;
            await carService.deleteCar(id, sessionId);
            const cars = await carService.getCarBySessionId(sessionId);
            setCars(cars.data);
        } catch (error) {
            console.error('Erro ao deletar carrinho:', error);
        }
    };

    const getAddressPerCep = async (
        cep: string,
        setFieldValue: (field: string, value: string | number, shouldValidate?: boolean | undefined) => void
    ) => {
        try {
            const response = await addressService.getAddressPerCep(cep);

            setClient((prevClient) => ({
                ...prevClient,
                address: {
                    cep: response.cep,
                    rua: response.logradouro,
                    bairro: response.bairro,
                    cidade: response.localidade,
                    estado: response.uf,
                    numero: '',
                    complemento: ''
                }
            }));

            // Update form values using Formik's setFieldValue
            setFieldValue('cep', response.cep);
            setFieldValue('street', response.logradouro);
            setFieldValue('neighborhood', response.bairro);
            setFieldValue('city', response.localidade);
            setFieldValue('state', response.uf);
        } catch (error) {
            console.error('Erro ao buscar endereço:', error);
            throw error;
        }
    };

    const handleUpdate = async (productId: number, quantity: number, id: number) => {
        try {
            if (!sessionId) return;
            const data = { produto_id: productId, quantidade: quantity, session_id: sessionId };
            await carService.updateCar(id, data);

            const cars = await carService.getCarBySessionId(sessionId);
            setCars(cars.data);
        } catch (error) {
            console.error('Erro ao atualizar carrinho:', error);
        }
    };

    const handleOrder = async (cars: Car[]) => {
        try {
            Cookies.set('client', JSON.stringify(client));
            let mensagem = '*Pedido de Compra Vovó Gussi* 🥗\n';
            let total = 0;

            cars.forEach((car) => {
                mensagem += `
🍴 *Item:* ${car.produto.nome}
📝 *Descrição:* ${car.produto.descricao}
💰 *Preço:* R$ ${car.produto.preco}
🔢 *Quantidade:* ${car.quantidade}
                  `;

                total += parseFloat(car.produto.preco) * car.quantidade;
            });

            mensagem += `\n*Total:* R$ ${total.toFixed(2)} 💵`;
            mensagem += `\n*Observação:* ${client.order.observacao} 📝`;
            mensagem += `\n\n*Informações do Cliente* 👤`;
            mensagem += `\n*Nome:* ${client.nome}`;
            mensagem += `\n*Telefone:* ${client.telefone}`;
            mensagem += `\n\n*Informações do Endereço* 🏠`;
            mensagem += `\n*Endereço:* ${client.address.rua}, ${client.address.numero}, ${client.address.complemento}`;
            mensagem += `\n*Bairro:* ${client.address.bairro}`;
            mensagem += `\n*Cidade:* ${client.address.cidade}`;

            const mensagemCodificada = encodeURIComponent(mensagem);

            const numero = '31997205220';
            const linkWhatsapp = `https://api.whatsapp.com/send/?phone=${numero}&text=${mensagemCodificada}`;

            const janela = window.open(linkWhatsapp, '_blank');
            // Aguarda 3 segundos e tenta fechar a janela
            setTimeout(() => {
                if (janela) {
                    janela.close();
                }
            }, 3000);
        } catch (error) {
            console.error('Erro ao fazer pedido:', error);
        }
    };

    useEffect(() => {
        const fetchCarsPerSession = async () => {
            if (!sessionId) return;
            const cars = await carService.getCarBySessionId(sessionId);
            setCars(cars.data);
            if (Cookies.get('client')) {
                setClient(
                    JSON.parse(
                        Cookies.get('client') || JSON.stringify({
                            nome: '',
                            telefone: '',
                            order: {
                                observacao: ''
                            },
                            address: {
                                cep: '',
                                rua: '',
                                bairro: '',
                                cidade: '',
                                estado: ''
                            }
                        })
                    )
                );
            }
        };
        fetchCarsPerSession();
    }, [sessionId]);

    return (
        <Container
            maxWidth="sm"
            sx={{
                pt: 2,
                pb: 15,
                border: '1px solid #ccc',
                borderRadius: 2,
                boxShadow: 2,
                mb: 2,
                bgcolor: '#f5f5f5'
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#81b08f',
                    p: 2,
                    borderRadius: 2
                }}
            >
                <IconButton
                    onClick={handleBack}
                    sx={{
                        position: 'absolute',
                        top: 30,
                        left: 16,
                        zIndex: 1,
                        bgcolor: '#f5f5f5',
                        '&:hover': { bgcolor: 'white' }
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>

                <Typography variant="h4" align="center" sx={{ mt: 2 }}>
                    Carrinho
                </Typography>
            </Box>

            <Typography variant="h6" sx={{ mb: 2 }} color="text.secondary" align="center">
                Seus produtos
            </Typography>
            {cars.length > 0 ? (
                <>
                    {cars.map((item) => (
                        <Box key={item.id} sx={{ mt: 1 }}>
                            <MenuItemCar
                                onUpdate={handleUpdate}
                                onDelete={handleDelete}
                                key={item.id}
                                title={item.produto.nome}
                                description={item.produto.descricao}
                                priceItem={parseFloat(item.produto.preco)}
                                image={item.produto.imagem_url}
                                productId={item.produto.id}
                                quantitySelected={item.quantidade}
                                id={item.id}
                            />
                        </Box>
                    ))}

                    <Box
                        sx={{
                            marginBottom: 2,
                            marginLeft: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                            <Typography component="h1" variant="h5" align="center" gutterBottom>
                                Informações
                            </Typography>

                            <Formik
                                initialValues={{
                                    name: client.nome,
                                    phone: client.telefone,
                                    cep: client.address.cep,
                                    street: client.address.rua,
                                    number: client.address.numero,
                                    complement: client.address.complemento,
                                    neighborhood: client.address.bairro,
                                    city: client.address.cidade,
                                    state: client.address.estado,
                                    observation: client.order.observacao
                                }}
                                validationSchema={validationSchema}
                                onSubmit={() => {}}
                            >
                                {({ errors, touched, handleChange, handleBlur, values, status, setFieldValue }) => (
                                    <Form>
                                        {status && (
                                            <Alert severity="error" sx={{ mb: 2 }}>
                                                {status}
                                            </Alert>
                                        )}

                                        <TextField
                                            fullWidth
                                            id="name"
                                            name="name"
                                            label="Nome"
                                            value={values.name}
                                            onChange={(e) => {
                                                setClient({ ...client, nome: e.target.value });
                                                setFieldValue('name', e.target.value);
                                            }}
                                            onBlur={handleBlur}
                                            error={touched.name && Boolean(errors.name)}
                                            helperText={touched.name && errors.name}
                                            margin="normal"
                                        />

                                        <TextField
                                            fullWidth
                                            id="phone"
                                            name="phone"
                                            label="Telefone"
                                            value={values.phone}
                                            onChange={(e) => {
                                                setClient({ ...client, telefone: e.target.value });
                                                setFieldValue('phone', e.target.value);
                                            }}
                                            onBlur={handleBlur}
                                            error={touched.phone && Boolean(errors.phone)}
                                            helperText={touched.phone && errors.phone}
                                            margin="normal"
                                        />

                                        <TextField
                                            fullWidth
                                            id="cep"
                                            name="cep"
                                            label="CEP"
                                            value={values.cep}
                                            onChange={handleChange}
                                            onBlur={(e) => {
                                                handleBlur(e);
                                                getAddressPerCep(e.target.value, setFieldValue);
                                            }}
                                            error={touched.cep && Boolean(errors.cep)}
                                            helperText={touched.cep && errors.cep}
                                            margin="normal"
                                        />

                                        <TextField
                                            fullWidth
                                            id="street"
                                            name="street"
                                            label="Rua"
                                            value={values.street}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.street && Boolean(errors.street)}
                                            helperText={touched.street && errors.street}
                                            margin="normal"
                                        />

                                        <TextField
                                            fullWidth
                                            id="number"
                                            name="number"
                                            label="Numero"
                                            value={values.number}
                                            onChange={(e) => {
                                                setClient({ ...client, address: { ...client.address, numero: e.target.value } });
                                                setFieldValue('number', e.target.value);
                                            }}
                                            onBlur={handleBlur}
                                            error={touched.number && Boolean(errors.number)}
                                            helperText={touched.number && errors.number}
                                            margin="normal"
                                        />

                                        <TextField
                                            fullWidth
                                            id="complement"
                                            name="complement"
                                            label="Complemento"
                                            value={values.complement}
                                            onChange={(e) => {
                                                setClient({ ...client, address: { ...client.address, complemento: e.target.value } });
                                                setFieldValue('complement', e.target.value);
                                            }}
                                            onBlur={handleBlur}
                                            error={touched.complement && Boolean(errors.complement)}
                                            helperText={touched.complement && errors.complement}
                                            margin="normal"
                                        />

                                        <TextField
                                            fullWidth
                                            id="neighborhood"
                                            name="neighborhood"
                                            label="Bairro"
                                            value={values.neighborhood}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.neighborhood && Boolean(errors.neighborhood)}
                                            helperText={touched.neighborhood && errors.neighborhood}
                                            margin="normal"
                                        />

                                        <TextField
                                            fullWidth
                                            id="city"
                                            name="city"
                                            label="Cidade"
                                            value={values.city}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.city && Boolean(errors.city)}
                                            helperText={touched.city && errors.city}
                                            margin="normal"
                                        />

                                        <TextField
                                            fullWidth
                                            id="state"
                                            name="state"
                                            label="Estado"
                                            value={values.state}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.state && Boolean(errors.state)}
                                            helperText={touched.state && errors.state}
                                            margin="normal"
                                        />

                                        <TextField
                                            fullWidth
                                            id="observation"
                                            name="observation"
                                            label="Observação"
                                            multiline
                                            rows={4}
                                            value={values.observation}
                                            onChange={(e) => {
                                                setFieldValue('observation', e.target.value);
                                                setClient({
                                                    ...client,
                                                    order: {
                                                        ...client.order,
                                                        observacao: e.target.value
                                                    }
                                                });
                                            }}
                                            onBlur={handleBlur}
                                            error={touched.observation && Boolean(errors.observation)}
                                            helperText={touched.observation && errors.observation}
                                            margin="normal"
                                        />
                                    </Form>
                                )}
                            </Formik>
                        </Paper>
                    </Box>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            bgcolor: '#81b08f',
                            '&:hover': { bgcolor: '#537a5f' }
                        }}
                        onClick={() => handleOrder(cars)}
                    >
                        Fazer pedido
                    </Button>
                </>
            ) : (
                <Typography variant="h6" sx={{ mt: 10 }} color="text.secondary" align="center">
                    Seu carrinho esta vazio
                </Typography>
            )}
        </Container>
    );
};

export default CarPage;
