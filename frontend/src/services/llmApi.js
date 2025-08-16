// Serviço para conversar com o backend (Ollama)
import axios from 'axios';

export async function conversarComIA(messages) {
  const { data } = await axios.post('http://localhost:3001/llm/sermon-assistant', { messages });
  return data.resposta;
}
