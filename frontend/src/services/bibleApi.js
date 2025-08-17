// Serviço para consumir a API de Bíblia do backend
import axios from 'axios';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3001') + '/biblex'; // ajuste se backend estiver em outro endereço

export const getLanguages = async () => {
  const { data } = await axios.get(`${API_BASE}/languages`);
  return data;
};

export const getBibles = async (languageCode) => {
  const { data } = await axios.get(`${API_BASE}/bibles`, { params: { languageCode } });
  return data;
};

export const getBooks = async (bibleId) => {
  const { data } = await axios.get(`${API_BASE}/books`, { params: { bibleId } });
  return data;
};

export const getChapters = async (bibleId, bookId) => {
  const { data } = await axios.get(`${API_BASE}/chapters`, { params: { bibleId, bookId } });
  return data;
};

export const getVerse = async (bibleId, bookId, chapter, verse) => {
  const { data } = await axios.get(`${API_BASE}/verse`, { params: { bibleId, bookId, chapter, verse } });
  return data;
};

export const getAudio = async (bibleId, bookId, chapter) => {
  const { data } = await axios.get(`${API_BASE}/audio`, { params: { bibleId, bookId, chapter } });
  return data;
};

export const getVideo = async (bibleId, bookId, chapter) => {
  const { data } = await axios.get(`${API_BASE}/video`, { params: { bibleId, bookId, chapter } });
  return data;
};
