'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';

const SetSessionCookie = () => {
    useEffect(() => {
        const session = Cookies.get('session');

        if (!session) {
            // Gerar um valor aleatório para o cookie
            const randomSession = Math.random().toString(36).substring(2, 15);

            // Armazenar o cookie por 7 dias
            Cookies.set('session', randomSession, { expires: 7 });
        }
    }, []);

    return null; // Não precisa renderizar nada
};

export default SetSessionCookie;
