// Serviço para buscar dados de palavras bíblicas originais (hebraico/grego)
import axios from 'axios';

// STEP Bible Data API (dados abertos)
// Exemplo: https://www.stepbible.org/rest/lexicon/search?query=agape
export async function buscarPalavraOriginal(termo) {
  // Busca na STEP Bible
  const url = `https://www.stepbible.org/rest/lexicon/search?query=${encodeURIComponent(termo)}`;
  const { data } = await axios.get(url);
  if (!data.entries || data.entries.length === 0) return null;
  const entry = data.entries[0];
  return {
    termo: entry.headword,
    transliteracao: entry.transliteration,
    significado: entry.meaning,
    strong: entry.strongNumber,
    idioma: entry.language,
    exemplos: entry.examples || [],
    escritaOriginal: entry.original,
    pronuncia: entry.pronunciation || '',
    referencias: entry.references || [],
    audio: entry.audio || ''
  };
}
