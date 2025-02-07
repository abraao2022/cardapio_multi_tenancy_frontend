import api from './api';

const addressService = {
    async getAddressPerCep(cep: string) {
        try {
            const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar endereço:', error);
            throw error;
        }
    }
};

export default addressService;
