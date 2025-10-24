import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

axios.defaults.baseURL = API_URL;

export const patientsAPI = {
  getAll: () => axios.get('/patients'),
  getById: (id) => axios.get(`/patients/${id}`),
  create: (data) => axios.post('/patients', data),
  update: (id, data) => axios.put(`/patients/${id}`, data),
  delete: (id) => axios.delete(`/patients/${id}`),
};

export const doctorsAPI = {
  getAll: () => axios.get('/doctors'),
  getById: (id) => axios.get(`/doctors/${id}`),
  create: (data) => axios.post('/doctors', data),
  update: (id, data) => axios.put(`/doctors/${id}`, data),
  delete: (id) => axios.delete(`/doctors/${id}`),
};

export const appointmentsAPI = {
  getAll: () => axios.get('/appointments'),
  getById: (id) => axios.get(`/appointments/${id}`),
  create: (data) => axios.post('/appointments', data),
  update: (id, data) => axios.put(`/appointments/${id}`, data),
  delete: (id) => axios.delete(`/appointments/${id}`),
  getByDate: (date) => axios.get(`/appointments/date/${date}`),
  getByDoctor: (doctorId) => axios.get(`/appointments/doctor/${doctorId}`),
  getByPatient: (patientId) => axios.get(`/appointments/patient/${patientId}`),
};

export const billingAPI = {
  getAll: () => axios.get('/billing'),
  getById: (id) => axios.get(`/billing/${id}`),
  create: (data) => axios.post('/billing', data),
  getByPatient: (patientId) => axios.get(`/billing/patient/${patientId}`),
};

export const statsAPI = {
  getDashboard: () => axios.get('/stats/dashboard'),
};
