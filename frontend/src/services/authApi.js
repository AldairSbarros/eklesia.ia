import axios from 'axios';

export async function login(email, password) {
  const { data } = await axios.post('http://localhost:3001/auth/login', { email, password });
  return data;
}

export async function register(email, password, name) {
  const { data } = await axios.post('http://localhost:3001/auth/register', { email, password, name });
  return data;
}
