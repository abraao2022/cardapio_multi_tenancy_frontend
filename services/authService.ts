import api from './api';

interface LoginResponse {
    status: boolean;
    message: string;
    data: {
        user: {
            id: number;
            name: string;
            email: string;
        };
        token: {
            access_token: string;
            type: string;
        };
    };
}

const authService = {
    async login(email: string, password: string): Promise<LoginResponse> {
        try {
            const response = await api.post<LoginResponse>('/auth/login', {
                email,
                password
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw error;
        }
    },

    async logout() {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            throw error;
        }
    },

    async getMe() {
        try {
            const response = await api.get('/auth/me');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar o usuário:', error);
            throw error;
        }
    }
};

export default authService;
