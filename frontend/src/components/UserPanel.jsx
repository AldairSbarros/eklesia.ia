import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserPanel({ token, user }) {
  const [files, setFiles] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [f, p] = await Promise.all([
          axios.get('http://localhost:3001/user/files', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:3001/user/payments', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setFiles(f.data);
        setPayments(p.data);
      } catch (err) {
        setFiles([]);
        setPayments([]);
      }
      setLoading(false);
    };
    fetchData();
  }, [token]);

  return (
    <div style={{ margin: '32px 0', padding: 16, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Painel do Usuário</h2>
      <div style={{ marginBottom: 12 }}>
        <b>Tipo de usuário:</b> {user?.role === 'superuser'
          ? 'SUPERUSER (ACESSO TOTAL)'
          : user?.role === 'admin'
            ? 'Administrador'
            : user?.role === 'premium'
              ? 'Assinante Premium'
              : user?.role === 'personal'
                ? 'Plano Pessoal'
                : user?.role === 'church'
                  ? 'Plano Igreja'
                  : user?.role === 'advanced'
                    ? 'Plano Avançado'
                    : 'Usuário Gratuito'}
      </div>
      {loading ? <p>Carregando...</p> : (
        <>
          <h3>Meus Arquivos/Textos Ingeridos</h3>
          <ul>
            {files.length === 0 && <li>Nenhum arquivo encontrado.</li>}
            {files.map(f => (
              <li key={f.id}>
                <b>{f.filename}</b> ({new Date(f.createdAt).toLocaleString()})
                <details>
                  <summary>Ver texto</summary>
                  <pre style={{ maxHeight: 120, overflow: 'auto' }}>{f.text.slice(0, 2000)}{f.text.length > 2000 ? '...' : ''}</pre>
                </details>
              </li>
            ))}
          </ul>
          <h3>Pagamentos</h3>
          <ul>
            {user?.role === 'superuser' && <li>ACESSO TOTAL - Nenhum pagamento necessário.</li>}
            {user?.role !== 'superuser' && payments.length === 0 && <li>Nenhum pagamento encontrado.</li>}
            {user?.role !== 'superuser' && payments.map(p => (
              <li key={p.id}>
                <b>Status:</b> {p.status} | <b>Método:</b> {p.method} | <b>Valor:</b> R$ {p.amount.toFixed(2)} | <b>Data:</b> {new Date(p.createdAt).toLocaleString()}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
