import React, { useState } from 'react';
import axios from 'axios';

export default function PaymentPanel({ token }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('Plano Mensal Eklesia IA');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePayment = async e => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const { data } = await axios.post('http://localhost:3001/payment/create', { amount: Number(amount), description }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResult(data);
    } catch (err) {
      setResult({ error: err.response?.data?.error || 'Erro ao criar pagamento' });
    }
    setLoading(false);
  };

  return (
    <div style={{ margin: '32px 0', padding: 16, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Planos e Assinaturas</h2>
      <table style={{ width: '100%', marginBottom: 24, borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th>Plano</th>
            <th>Valor</th>
            <th>Recursos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gratuito</td>
            <td>R$ 0/mês</td>
            <td>10 buscas/mês, 1 PDF, recursos básicos</td>
          </tr>
          <tr>
            <td>Pessoal</td>
            <td>R$ 29/mês</td>
            <td>Ilimitado para 1 usuário, exportação, WhatsApp, IA básica</td>
          </tr>
          <tr>
            <td>Igreja</td>
            <td>R$ 99/mês</td>
            <td>Até 10 usuários, tudo ilimitado, suporte prioritário, relatórios</td>
          </tr>
          <tr>
            <td>Avançado</td>
            <td>R$ 199/mês</td>
            <td>Ilimitado, recursos premium (API, integrações avançadas, customização)</td>
          </tr>
        </tbody>
      </table>
      <h3>Assinar Agora</h3>
      <form onSubmit={handlePayment}>
        <label>Valor (R$):</label>
        <input type="number" min={1} value={amount} onChange={e => setAmount(e.target.value)} required />
        <br />
        <label>Descrição:</label>
        <input value={description} onChange={e => setDescription(e.target.value)} required style={{ width: 250 }} />
        <br />
        <button type="submit" disabled={loading}>{loading ? 'Processando...' : 'Gerar Cobrança Pix'}</button>
      </form>
      {result && (
        <div style={{ marginTop: 16 }}>
          {result.error && <p style={{ color: 'red' }}>{result.error}</p>}
          {result.pagseguro && (
            <>
              <p><b>Status:</b> {result.payment.status}</p>
              <p><b>ID Pagamento:</b> {result.payment.id}</p>
              <p><b>Pix Copia e Cola:</b></p>
              <pre style={{ background: '#eee', padding: 8 }}>{result.pagseguro.qr_codes?.[0]?.emv || '---'}</pre>
              {result.pagseguro.qr_codes?.[0]?.links?.[0]?.href && (
                <a href={result.pagseguro.qr_codes[0].links[0].href} target="_blank" rel="noopener noreferrer">Ver QR Code</a>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
