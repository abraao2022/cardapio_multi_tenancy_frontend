import axios from 'axios';

const getApiBaseUrl = () => {
    const host = typeof window !== 'undefined' ? window.location.hostname : '';
    const subdomain = host.split('.')[0];

    if (subdomain) {
        return `https://${subdomain}.api.facilmenu.com/api`;
    }

    // Fallback para a URL padrão caso não consiga identificar o subdomínio
    return process.env.NEXT_PUBLIC_API_BASE_URL || 'https://default.api.facilmenu.com/api';
};

const api = axios.create({
    baseURL: getApiBaseUrl(),
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
