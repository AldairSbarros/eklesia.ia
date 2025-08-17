// Serviço para conversar com o backend (Ollama)
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function conversarComIA(messages) {
  const { data } = await axios.post(`${API_BASE}/llm/sermon-assistant`, { messages });
  return data.resposta;
}
