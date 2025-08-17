import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function login(email, password) {
  const { data } = await axios.post(`${API_BASE}/auth/login`, { email, password });
  return data;
}

export async function register(email, password, name) {
  const { data } = await axios.post(`${API_BASE}/auth/register`, { email, password, name });
  return data;
}
