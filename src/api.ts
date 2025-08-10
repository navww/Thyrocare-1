import axios from 'axios';
import { Service } from './contexts/ServiceContext';
const api = axios.create({
  baseURL: 'https://thybackend.onrender.com/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getServices = () => api.get('/service');
export const addServiceAPI = (serviceData: Omit<Service, 'id'>) => api.post('/service', serviceData);
export const updateServiceAPI = (id: string, serviceData: Partial<Service>) => api.put(`/service/${id}`, serviceData);
export const deleteServiceAPI = (id: string) => api.delete(`/service/${id}`);

export default api;
