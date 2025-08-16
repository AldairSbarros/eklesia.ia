// Integração básica com PagSeguro (exemplo inicial)
// Use a biblioteca oficial ou requisições HTTP para produção
import axios from 'axios';

export async function criarPagamentoPix(valor, descricao, cpf) {
  // Exemplo de payload simplificado
  const payload = {
    reference_id: `pedido_${Date.now()}`,
    customer: { document: cpf },
    amount: { value: valor, currency: 'BRL' },
    payment_method: { type: 'PIX' },
    description: descricao
  };

  const response = await axios.post(
    'https://sandbox.api.pagseguro.com/orders',
    payload,
    {
      headers: {
        'Authorization': `Bearer ${process.env.PAGSEGURO_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data;
}
