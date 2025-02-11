import axios from 'axios';

const getApiBaseUrl = () => {
    if (typeof window === 'undefined') return process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.menufacil.com/api';

    const host = window.location.hostname;
    const parts = host.split('.');

    // Se houver pelo menos três partes e não for "www", assume que há um subdomínio
    const isSubdomain = parts.length > 2 && parts[0] !== 'www';

    if (isSubdomain) {
        const subdomain = parts[0];
        return `https://${subdomain}.api.menufacil.com/api`;
    }

    // Domínio sem subdomínio
    return 'https://api.menufacil.com/api';
};

const api = axios.create({
    baseURL: getApiBaseUrl(),
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
