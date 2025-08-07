import api from './axios';

export const getUsers = () => api.get('/users');
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const getUserAttendance = (id) => api.get(`/users/${id}/attendance`);