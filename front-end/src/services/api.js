import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3500',
  headers: { 'Access-Control-Allow-Origin': '*' },
});

export default api;
