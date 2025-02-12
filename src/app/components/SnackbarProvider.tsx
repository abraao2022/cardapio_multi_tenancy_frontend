'use client'; // 🔥 Isso garante que ele só rode no cliente

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, Alert } from '@mui/material';

type SnackbarContextType = {
    showSnackbar: (message: string, severity?: 'success' | 'error' | 'warning' | 'info') => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');

    const showSnackbar = (msg: string, sev: 'success' | 'error' | 'warning' | 'info' = 'info') => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
                <Alert severity={severity} onClose={() => setOpen(false)}>
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar deve ser usado dentro do SnackbarProvider');
    }
    return context;
};
