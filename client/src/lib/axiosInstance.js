import axios from 'axios';

// Determine the base URL based on the environment
const baseUrl = import.meta.env.MODE === "development" 
    ? 'http://localhost:5000/api' 
    : process.env.NODE_ENV === "production" 
        ? '/api' 
        : ''; // Default or fallback URL if needed

// Create an Axios instance with the base URL and credentials enabled
export const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

// Optional: Add an interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized - please log in again.");
            // Optionally, you can redirect to login or handle a token refresh here
        }
        return Promise.reject(error);
    }
);
