import axios from 'axios';

// Use environment variable for API base URL
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Debug logging for development
if (import.meta.env.DEV) {
  console.log('[DEV] API Base URL:', baseURL);
  console.log('[DEV] Environment:', import.meta.env.MODE);
}

const api = axios.create({
  baseURL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
