import api from './api';

interface ProductData {
    nome: string;
    preco: number;
    categoria_id: number;
    descricao?: string;
}

interface ApiError {
    status: string;
    message: string;
    errors?: {
        [key: string]: string[];
    };
}

const productsService = {
    async getAllProducts(productName: string, categoryId: number | null) {
        try {
            const response = await api.get(`/produtos?productName=${productName}&categoryId=${categoryId}`);
            return response.data;
        } catch (error: any) {
            if (error.response?.data) {
                throw error.response.data;
            }
            throw error;
        }
    },

    async getProductById(id: number) {
        try {
            const response = await api.get(`/produtos/${id}`);
            return response.data;
        } catch (error: any) {
            if (error.response?.data) {
                throw error.response.data;
            }
            throw error;
        }
    },

    async createProduct(data: FormData) {
        try {
            const response = await api.post('/produtos', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error: any) {
            if (error.response?.data) {
                throw error.response.data;
            }
            throw error;
        }
    },

    async updateProduct(id: number, data: FormData) {
        try {
            const response = await api.put(`/produtos/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error: any) {
            if (error.response?.data) {
                throw error.response.data;
            }
            throw error;
        }
    },

    async deleteProduct(id: number) {
        try {
            const response = await api.delete(`/produtos/${id}`);
            return response.data;
        } catch (error: any) {
            if (error.response?.data) {
                throw error.response.data;
            }
            throw error;
        }
    }
};

export default productsService;
