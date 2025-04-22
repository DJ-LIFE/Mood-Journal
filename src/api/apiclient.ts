import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { InternalAxiosRequestConfig } from 'axios';

const apiClient: AxiosInstance = axios.create({
    baseURL: 'https://api.openweathermap.org', // Replace with your API base URL
    timeout: 10000, // Request timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
    apiClient.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
        // Add authorization token or other custom logic here
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.set('Authorization', `Bearer ${token}`);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default apiClient;