import api from './axios';

export const markAttendance = (status, date) =>
  api.post('/attendance/mark', { status, date });

export const getMyAttendance = (params) =>
  api.get('/attendance/me', { params });

export const getAllAttendance = (params) =>
  api.get('/attendance/all', { params });