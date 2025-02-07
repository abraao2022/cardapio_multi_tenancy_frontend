// src/app/login/page.tsx
'use client';

import { useAuth } from '../contexts/AuthContext';
import { Box, Container, Paper, Typography, Alert } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';

const validationSchema = Yup.object({
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    password: Yup.string().required('Senha é obrigatória')
});

export default function Login() {
    const { login } = useAuth();

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                    <Typography component="h1" variant="h5" align="center" gutterBottom>
                        Login do Administrador
                    </Typography>

                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting, setStatus }) => {
                            try {
                                await login(values.email, values.password);
                            } catch (error: unknown) {
                                if (error instanceof Error) {
                                    setStatus(error.message);
                                } else {
                                    setStatus('An unexpected error occurred');
                                }
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ errors, touched, handleChange, handleBlur, values, isSubmitting, status }) => (
                            <Form>
                                {status && (
                                    <Alert severity="error" sx={{ mb: 2 }}>
                                        {status}
                                    </Alert>
                                )}

                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    margin="normal"
                                />

                                <TextField
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Senha"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    margin="normal"
                                />

                                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isSubmitting}>
                                    {isSubmitting ? 'Entrando...' : 'Entrar'}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Box>
        </Container>
    );
}
