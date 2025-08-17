import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function analisarHermeneutica(texto) {
  const { data } = await axios.post(`${API_BASE}/bible/hermeneutics`, { texto });
  return data.analise;
}
