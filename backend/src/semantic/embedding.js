// Utilitário para gerar embeddings usando HuggingFace Inference API
import { HfInference } from '@huggingface/inference';

const HF_TOKEN = process.env.HF_TOKEN || '';
const hf = new HfInference(HF_TOKEN);

// Modelo padrão: sentence-transformers/all-MiniLM-L6-v2 (384 dimensões)
export async function gerarEmbedding(texto) {
  const res = await hf.featureExtraction({
    model: 'sentence-transformers/all-MiniLM-L6-v2',
    inputs: texto,
  });
  // Retorna o vetor do primeiro resultado
  return Array.isArray(res) && Array.isArray(res[0]) ? res[0] : res;
}
