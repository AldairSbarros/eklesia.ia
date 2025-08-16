// Integração com Ollama API local
import axios from 'axios';

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3';

export async function gerarRespostaOllama(mensagens) {
  // mensagens: array de {role: 'user'|'assistant'|'system', content: string}
  const response = await axios.post(`${OLLAMA_URL}/api/chat`, {
    model: OLLAMA_MODEL,
    messages: mensagens
  });
  // Retorna apenas o texto da última resposta
  return response.data.message.content;
}
