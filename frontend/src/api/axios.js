import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vercel.com/ameer-hamza26s-projects/full-stack-attendence-management-system-758m/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
