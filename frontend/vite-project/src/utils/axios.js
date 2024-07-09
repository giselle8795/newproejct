import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD ? '' : 'http://localhost:4000'
});

axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('accessToken');
    console.log('Using token:', token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default axiosInstance;
