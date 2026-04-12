// Experiment 3.1.2 — Axios instance that attaches the JWT on every request
import axios from 'axios';

// dev:  VITE_API_BASE_URL = http://localhost:3001  (Vite proxy forwards /api there)
// prod: VITE_API_BASE_URL = https://your-backend.com (hits server directly)
const BASE = import.meta.env.VITE_API_BASE_URL || '';

const api = axios.create({
  baseURL: `${BASE}/api`,
});

// inject Bearer token from localStorage before each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;
