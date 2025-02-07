import api from './api';

const carService = {
    async createCar(data: any) {
        try {
            const response = await api.post('/carrinho', data);
            return response.data;
        } catch (error) {
            console.error('Erro ao criar carrinho:', error);
            throw error;
        }
    },

    async updateCar(id: number, data: any) {
        try {
            const response = await api.put(`/carrinho/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar carrinho:', error);
            throw error;
        }
    },

    async getCarBySessionId(session_id: string) {
        try {
            const response = await api.get(`/carrinho?session_id=${session_id}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar carrinho:', error);
            throw error;
        }
    },

    async deleteCar(id: number, sessionId: string) {
        try {
            const response = await api.delete(`/carrinho/${id}?session_id=${sessionId}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao deletar carrinho:', error);
            throw error;
        }
    }
};

export default carService;
