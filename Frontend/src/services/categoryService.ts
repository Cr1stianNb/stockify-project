/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
 
});

export const getCategories  = () => api.get('/category/');
export const getCategory   = (id: number) => api.get(`/category/${id}/`);
export const createCategory = (data: any) => api.post('/category/', data);
export const updateCategory = (id: number, data: any) => api.put(`/category/${id}/`, data);
export const deleteCategory = (id: number) => api.delete(`/category/${id}/`);
