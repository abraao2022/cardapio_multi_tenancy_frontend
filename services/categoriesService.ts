import api from './api';

const categoriesService = {
    async getAllCategories() {
        try {
            const response = await api.get('/categorias');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
            throw error;
        }
    },

    async deleteCategory(id: number) {
        try {
            const response = await api.delete(`/categorias/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao deletar categoria:', error);
            throw error;
        }
    },

    async updateCategory(id: number, data: { nome: string; categoria_id?: number }) {
        try {
            const response = await api.put(`/categorias/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar categoria:', error);
            throw error;
        }
    },

    async createCategory(data: { nome: string; categoria_id?: number }) {
        try {
            const response = await api.post('/categorias', data);
            return response.data;
        } catch (error) {
            console.error('Erro ao criar categoria:', error);
            throw error;
        }
    },

    async getCategoryById(id: number) {
        try {
            const response = await api.get(`/categorias/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar categoria por ID:', error);
            throw error;
        }
    }
};

export default categoriesService;
