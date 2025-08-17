import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function buscarMapa(local) {
  const { data } = await axios.get(`${API_BASE}/bible/maps?local=${encodeURIComponent(local)}`);
  return data;
}

export async function buscarImagens(termo) {
  const { data } = await axios.get(`${API_BASE}/bible/images?termo=${encodeURIComponent(termo)}`);
  return data;
}

export async function buscarDadosHistoricos(termo) {
  const { data } = await axios.get(`${API_BASE}/bible/data?termo=${encodeURIComponent(termo)}`);
  return data;
}

export async function buscarArtefatos(termo) {
  const { data } = await axios.get(`${API_BASE}/bible/artifacts?termo=${encodeURIComponent(termo)}`);
  return data;
}
