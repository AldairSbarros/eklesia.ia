import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function buscarPalavraOriginal(termo) {
  const { data } = await axios.get(`${API_BASE}/bible/word?termo=${encodeURIComponent(termo)}`);
  return data;
}
