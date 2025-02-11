'use client';
import React, { useState } from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    Grid,
    TextField,
    Button,
    Divider,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    AppBar,
    Toolbar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { forwardRef } from 'react';
import { InputMask, type InputMaskProps } from '@react-input/mask';

import paymentService from '../../../services/paymentService';
/* eslint-disable */
const ForwardedInputMask = forwardRef<HTMLInputElement, InputMaskProps & { mask: string }>(({ mask, ...props }, forwardedRef) => {
    return <InputMask ref={forwardedRef} mask={mask} replacement="_" {...props} />;
});
/* eslint-enable */
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
}));

const PlanCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    cursor: 'pointer',
    border: '2px solid transparent',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[4]
    },
    '&.selected': {
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light + '10'
    }
}));

const plans = [
    {
        id: 1,
        name: 'Mensal',
        label: 'mês',
        price: 49.9
    },
    {
        id: 2,
        name: 'Semenstral',
        label: 'semestre',
        price: 99.9
    },
    {
        id: 3,
        name: 'Anual',
        label: 'ano',
        price: 199.9
    }
];

// Definir o schema de validação com Yup
const validationSchema = Yup.object({
    companyName: Yup.string().required('Nome da empresa é obrigatório'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    cnpj: Yup.string().required('CNPJ é obrigatório'),
    phone: Yup.string().required('Telefone é obrigatório'),
    cardName: Yup.string().required('Nome do cartão é obrigatório'),
    cardNumber: Yup.string().required('Número do cartão é obrigatório'),
    expDate: Yup.string().required('Data de expiração é obrigatória'),
    cvv: Yup.string().required('CVV é obrigatório')
});

const Checkout = () => {
    const [selectedPlan, setSelectedPlan] = useState(1); // Começa com o primeiro plano
    const [paymentMethod, setPaymentMethod] = useState('credit');

    const currentPlan = plans.find((plan) => plan.id === selectedPlan);

    return (
        <Box>
            <AppBar position="static" sx={{ bgcolor: 'white', boxShadow: 1 }}>
                <Toolbar>
                    <Image src="/img/logo.png" alt="Logo" width={100} height={100} />
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg">
                <Typography variant="h4" sx={{ mt: 4, mb: 2 }} color="primary">
                    Escolha seu plano
                </Typography>

                <Grid container spacing={3}>
                    {plans.map((plan) => (
                        <Grid item xs={12} md={4} key={plan.id}>
                            <PlanCard
                                className={selectedPlan === plan.id ? 'selected' : ''}
                                onClick={() => setSelectedPlan(plan.id)}
                                elevation={selectedPlan === plan.id ? 4 : 1}
                            >
                                <Typography variant="h5" gutterBottom>
                                    {plan.name}
                                </Typography>
                                <Typography variant="h4" color="primary" gutterBottom>
                                    R$ {plan.price.toFixed(2)}
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Por {plan.label}
                                </Typography>
                            </PlanCard>
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="h4" sx={{ mb: 2 }}>
                    Finalizar Assinatura
                </Typography>

                <Formik
                    initialValues={{
                        companyName: '',
                        email: '',
                        cnpj: '',
                        phone: '',
                        cardName: '',
                        cardNumber: '',
                        expDate: '',
                        cvv: '',
                        paymentMethod: 'credit'
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        // Função para processar o pagamento com Stripe
                        const response = await paymentService.createCheckout(values);
                        window.location.href = response.url;
                    }}
                >
                    {({ setFieldValue, handleSubmit, errors, touched }) => (
                        <Form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={8}>
                                    <StyledPaper>
                                        <Typography variant="h6" gutterBottom>
                                            Dados da Empresa
                                        </Typography>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <Field
                                                    as={TextField}
                                                    name="companyName"
                                                    label="Nome da empresa"
                                                    fullWidth
                                                    variant="outlined"
                                                    error={touched.companyName && Boolean(errors.companyName)}
                                                    helperText={touched.companyName && errors.companyName}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    as={TextField}
                                                    name="email"
                                                    label="Email corporativo"
                                                    fullWidth
                                                    variant="outlined"
                                                    type="email"
                                                    error={touched.email && Boolean(errors.email)}
                                                    helperText={touched.email && errors.email}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    as={TextField}
                                                    name="cnpj"
                                                    label="CNPJ"
                                                    fullWidth
                                                    variant="outlined"
                                                    error={touched.cnpj && Boolean(errors.cnpj)}
                                                    helperText={touched.cnpj && errors.cnpj}
                                                    InputProps={{
                                                        inputComponent: ForwardedInputMask,
                                                        inputProps: { mask: '__.___.___/____-__' }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    as={TextField}
                                                    name="phone"
                                                    label="Telefone"
                                                    fullWidth
                                                    variant="outlined"
                                                    error={touched.phone && Boolean(errors.phone)}
                                                    helperText={touched.phone && errors.phone}
                                                    InputProps={{
                                                        inputComponent: ForwardedInputMask,
                                                        inputProps: { mask: '(__) ____-____' }
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </StyledPaper>

                                    <StyledPaper>
                                        <Typography variant="h6" gutterBottom>
                                            Forma de Pagamento
                                        </Typography>
                                        <FormControl component="fieldset">
                                            <RadioGroup
                                                value={paymentMethod}
                                                onChange={(e) => {
                                                    setFieldValue('paymentMethod', e.target.value);
                                                    setPaymentMethod(e.target.value);
                                                }}
                                            >
                                                <FormControlLabel value="credit" control={<Radio />} label="Cartão de Crédito" />
                                                <FormControlLabel value="pix" control={<Radio />} label="PIX" />
                                            </RadioGroup>
                                        </FormControl>

                                        {paymentMethod === 'credit' && (
                                            <Grid container spacing={3} sx={{ mt: 1 }}>
                                                <Grid item xs={12}>
                                                    <Field
                                                        as={TextField}
                                                        name="cardName"
                                                        label="Nome no cartão"
                                                        fullWidth
                                                        variant="outlined"
                                                        error={touched.cardName && Boolean(errors.cardName)}
                                                        helperText={touched.cardName && errors.cardName}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        as={TextField}
                                                        name="cardNumber"
                                                        label="Número do cartão"
                                                        fullWidth
                                                        variant="outlined"
                                                        error={touched.cardNumber && Boolean(errors.cardNumber)}
                                                        helperText={touched.cardNumber && errors.cardNumber}
                                                        InputProps={{
                                                            inputComponent: ForwardedInputMask,
                                                            inputProps: { mask: '____ ____ ____ ____' }
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        as={TextField}
                                                        name="expDate"
                                                        label="Data de validade"
                                                        fullWidth
                                                        variant="outlined"
                                                        error={touched.expDate && Boolean(errors.expDate)}
                                                        helperText={touched.expDate && errors.expDate}
                                                        InputProps={{
                                                            inputComponent: ForwardedInputMask,
                                                            inputProps: { mask: '__/____' }
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        as={TextField}
                                                        name="cvv"
                                                        label="CVV"
                                                        fullWidth
                                                        variant="outlined"
                                                        error={touched.cvv && Boolean(errors.cvv)}
                                                        helperText={touched.cvv && errors.cvv}
                                                        InputProps={{
                                                            inputComponent: ForwardedInputMask,
                                                            inputProps: { mask: '___' }
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        )}
                                    </StyledPaper>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <StyledPaper>
                                        <Typography variant="h6" gutterBottom>
                                            Resumo do Plano
                                        </Typography>
                                        <Box sx={{ mt: 2, mb: 2 }}>
                                            <Typography variant="subtitle1" gutterBottom>
                                                Plano {currentPlan?.name}
                                            </Typography>
                                        </Box>
                                        <Divider />
                                        <Box sx={{ mt: 2 }}>
                                            <Typography variant="subtitle1">
                                                Total mensal:{' '}
                                                <Typography component="span" variant="h6">
                                                    R$ {currentPlan?.price.toFixed(2)}
                                                </Typography>
                                            </Typography>
                                        </Box>
                                    </StyledPaper>

                                    <Box sx={{ mt: 2 }}>
                                        <Button variant="contained" type="submit" fullWidth>
                                            Confirmar Assinatura
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Container>
        </Box>
    );
};

export default Checkout;
