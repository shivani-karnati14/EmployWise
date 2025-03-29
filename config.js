import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor if needed
api.interceptors.request.use(
  (config) => {
    // You can modify requests here (e.g., add auth token)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor if needed
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

export default api;