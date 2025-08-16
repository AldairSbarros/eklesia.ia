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
      <h2>Assinar Plano</h2>
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
