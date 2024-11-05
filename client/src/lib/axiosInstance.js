import axios from 'axios';

// Determine the base URL based on the environment
const baseUrls = import.meta.env.MODE === "development" ? 'http://localhost:5000/api' : '/api';

// Create an Axios instance with the base URL and credentials enabled
export const axiosInstance = axios.create({
    baseURL: baseUrls,
    withCredentials: true,
});
