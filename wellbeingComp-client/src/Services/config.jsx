import axios from 'axios';

//export const baseUrl = "http://localhost:3003";
export const baseUrl = "https://compatly.jobd.link";


export const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
       
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);