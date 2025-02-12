import api from './api';

const tenantService = {
    async createTenant(data: object) {
        try {
            const response = await api.post('criar-cliente', data);
            return response.data;
        } catch (error: any) {
            if (error.response?.data) {
                throw error.response.data;
            }
            throw error;
        }
    }
};

export default tenantService;