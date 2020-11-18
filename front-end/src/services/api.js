import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3500',
  headers: { 'auth-token': localStorage.getItem('auth-token') },
});

export default api;
