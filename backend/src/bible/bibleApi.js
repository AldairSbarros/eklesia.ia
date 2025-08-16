// Integração com API de Bíblias (https://4.dbt.io/api)
import axios from 'axios';

const BIBLE_API_URL = 'https://4.dbt.io/api';
const BIBLE_API_KEY = process.env.BIBLE_API_KEY || '2c893a54-d251-4d35-8566-85856045c2f8';

export async function buscarVersiculo(bibleId, bookId, chapter, verse) {
  const params = {
    key: BIBLE_API_KEY,
    bible_id: bibleId,
    book_id: bookId,
    chapter_id: chapter,
    verse_id: verse,
    v: 2
  };
  const response = await axios.get(`${BIBLE_API_URL}/text/verse`, { params });
  return response.data;
}

// Exemplo de uso:
// buscarVersiculo('por-NTLH', 'GEN', 1, 1).then(console.log)
