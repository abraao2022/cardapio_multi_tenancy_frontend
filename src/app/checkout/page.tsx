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
    AppBar,
    Toolbar,
    InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { forwardRef } from 'react';
import { InputMask, type InputMaskProps } from '@react-input/mask';

import paymentService from '../../../services/paymentService';
import tenantService from '../../../services/tenantService';
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
    name: Yup.string().required('Nome da empresa é obrigatório'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    domain: Yup.string()
        .required('Subdomínio da empresa é obrigatório')
        .matches(/^[a-zA-Z0-9-]+$/, 'Subdomínio da empresa deve conter apenas letras e/ou hífens'),
    telefone: Yup.string().required('Telefone é obrigatório').min(15, 'Telefone inválido'),
    password: Yup.string()
        .required('Senha é obrigatória')
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
        .max(20, 'A senha deve ter no máximo 20 caracteres')
});

const Checkout = () => {
    const [selectedPlan, setSelectedPlan] = useState(1);

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

                <Formik
                    initialValues={{
                        name: '',
                        domain: '',
                        email: '',
                        telefone: '',
                        password: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        const tenant = await tenantService.createTenant(values);
                        const response = await paymentService.createCheckout({values, tenant});
                        window.location.href = response.url;
                    }}
                >
                    {({ handleSubmit, errors, touched }) => (
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
                                                    name="name"
                                                    label="Nome da empresa"
                                                    fullWidth
                                                    variant="outlined"
                                                    error={touched.name && Boolean(errors.name)}
                                                    helperText={touched.name && errors.name}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    as={TextField}
                                                    name="domain"
                                                    label="Subdomínio da empresa. Ex.: comidaboa"
                                                    fullWidth
                                                    variant="outlined"
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">.facilmenu.com</InputAdornment>
                                                    }}
                                                    error={touched.domain && Boolean(errors.domain)}
                                                    helperText={touched.domain && errors.domain}
                                                />
                                                <p style={{ fontSize: '12px', color: 'gray' }}>
                                                    Será o endereço do seu negócio na internet. Por exemplo: <strong>comidaboa.</strong>
                                                    No fim, ficará:<strong> comidaboa.facilmenu.com</strong>
                                                </p>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    as={TextField}
                                                    name="telefone"
                                                    label="Telefone"
                                                    fullWidth
                                                    variant="outlined"
                                                    error={touched.telefone && Boolean(errors.telefone)}
                                                    helperText={touched.telefone && errors.telefone}
                                                    InputProps={{
                                                        inputComponent: ForwardedInputMask,
                                                        inputProps: { mask: '(__) _____-____' }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    as={TextField}
                                                    name="email"
                                                    label="Email"
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
                                                    name="password"
                                                    label="Senha"
                                                    fullWidth
                                                    variant="outlined"
                                                    type="password"
                                                    error={touched.password && Boolean(errors.password)}
                                                    helperText={touched.password && errors.password}
                                                />
                                            </Grid>
                                        </Grid>
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
