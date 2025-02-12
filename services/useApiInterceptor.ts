'use client'; // 🔥 Isso impede que o Next.js tente rodar no servidor

import { useEffect } from 'react';
import api from './api';
import { useSnackbar } from '@/app/components/SnackbarProvider';

export const useApiInterceptor = () => {
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response) {
                    const { status, data } = error.response;

                    if (status === 422) {
                        const errorMessages = Object.values(data.errors).join(' ');
                        showSnackbar(`Erro de validação: ${errorMessages}`, 'error');
                    } else if (status === 401) {
                        showSnackbar('Sessão expirada. Faça login novamente.', 'warning');
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    } else {
                        showSnackbar(`Erro na API: ${data.message}`, 'error');
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [showSnackbar]);
};
