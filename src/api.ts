import axios from 'axios';
import { Service } from './contexts/ServiceContext';
const api = axios.create({
  baseURL: 'https://thybackend.onrender.com/api',
  headers: {
    'Accept': 'application/json,application/pdf,text/plain, */*',
  },
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
export const addServiceAPI = (serviceData: FormData) => api.post('/service', serviceData);
export const updateServiceAPI = (id: string, serviceData: FormData) => api.put(`/service/${id}`, serviceData);
export const deleteServiceAPI = (id: string) => api.delete(`/service/${id}`);

// Slider API calls
export const getSlidersAPI = () => api.get('/sliders');
export const addSliderAPI = (sliderData: { imageUrl: string; altText: string; order: number }) => api.post('/sliders', sliderData);
export const updateSliderAPI = (id: string, sliderData: Partial<{ imageUrl: string; altText: string; order: number }>) => api.put(`/sliders/${id}`, sliderData);
export const deleteSliderAPI = (id: string) => api.delete(`/sliders/${id}`);

export default api;
