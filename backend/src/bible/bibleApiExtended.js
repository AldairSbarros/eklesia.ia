// Integração avançada com API de Bíblias (https://4.dbt.io/api)
import axios from 'axios';

const BIBLE_API_URL = 'https://4.dbt.io/api';
const BIBLE_API_KEY = process.env.BIBLE_API_KEY;

export async function listarIdiomas() {
  const params = { key: BIBLE_API_KEY, v: 2 };
  const response = await axios.get(`${BIBLE_API_URL}/library/language`, { params });
  return response.data;
}

export async function listarBibliasPorIdioma(languageCode) {
  const params = { key: BIBLE_API_KEY, language_code: languageCode, v: 2 };
  const response = await axios.get(`${BIBLE_API_URL}/library/bible`, { params });
  return response.data;
}

export async function listarLivros(bibleId) {
  const params = { key: BIBLE_API_KEY, bible_id: bibleId, v: 2 };
  const response = await axios.get(`${BIBLE_API_URL}/library/book`, { params });
  return response.data;
}

export async function listarCapitulos(bibleId, bookId) {
  const params = { key: BIBLE_API_KEY, bible_id: bibleId, book_id: bookId, v: 2 };
  const response = await axios.get(`${BIBLE_API_URL}/library/chapter`, { params });
  return response.data;
}

export async function buscarVersiculo(bibleId, bookId, chapter, verse) {
  const params = { key: BIBLE_API_KEY, bible_id: bibleId, book_id: bookId, chapter_id: chapter, verse_id: verse, v: 2 };
  const response = await axios.get(`${BIBLE_API_URL}/text/verse`, { params });
  return response.data;
}

export async function buscarAudio(bibleId, bookId, chapter) {
  const params = { key: BIBLE_API_KEY, bible_id: bibleId, book_id: bookId, chapter_id: chapter, v: 2 };
  const response = await axios.get(`${BIBLE_API_URL}/audio/path`, { params });
  return response.data;
}

export async function buscarVideo(bibleId, bookId, chapter) {
  const params = { key: BIBLE_API_KEY, bible_id: bibleId, book_id: bookId, chapter_id: chapter, v: 2 };
  const response = await axios.get(`${BIBLE_API_URL}/video/path`, { params });
  return response.data;
}
