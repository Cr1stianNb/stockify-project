import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
	timeout: 10000,
});

export const getMovements = () => api.get('/movements/');
export const getMovementById = (id: number) => api.get(`/movements/${id}/`);
export const createMovement = (data: any) => api.post('/movements/', data);
export const updateMovement = (id: number, data: any) => api.put(`/movements/${id}/`, data);
export const deleteMovement = (id: number) => api.delete(`/movements/${id}/`);
