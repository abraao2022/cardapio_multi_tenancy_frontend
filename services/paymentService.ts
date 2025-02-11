import api from './api';

const paymentService = {
    async createCheckout(data: object) {
        try {
            const response = await api.post('criar-checkout', data);
            return response.data;
        } catch (error: any) {
            if (error.response?.data) {
                throw error.response.data;
            }
            throw error;
        }
    }
};

export default paymentService;