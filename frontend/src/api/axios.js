import axios from 'axios';

const baseURL = 'https://full-stack-attendence-management-sy-gules.vercel.app/api';

console.log('API Base URL:', baseURL);

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
