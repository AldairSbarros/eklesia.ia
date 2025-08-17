import React, { useState } from 'react';
import { login, register } from '../services/authApi';
import logo from '../assets/EklesiaKonecta-xOe6Dru8.png';
import Footer from './Footer';

export default function AuthForm({ onAuth }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let data;
      if (mode === 'login') {
        data = await login(email, password);
      } else {
        data = await register(email, password, name);
      }
      onAuth(data.token, data.user);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao autenticar');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f3f6fa', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 370, width: '100%', margin: '0 auto', padding: 32, background: '#e3eaf3', borderRadius: 16, boxShadow: '0 4px 32px #b6c2e122', textAlign: 'center' }}>
          <img src={logo} alt="Logo Eklesia IA" style={{ width: 90, marginBottom: 4 }} />
          <div style={{ fontWeight: 700, fontSize: 22, color: '#2a2a6a', marginBottom: 12 }}>Eklesia IA</div>
          {/* Título removido, pois já existe botão de entrar */}
          <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            {mode === 'register' && (
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontWeight: 500 }}>Nome:</label>
                <input value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #b6c2e1', marginTop: 2 }} />
              </div>
            )}
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontWeight: 500 }}>Email:</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #b6c2e1', marginTop: 2 }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontWeight: 500 }}>Senha:</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #b6c2e1', marginTop: 2 }} />
            </div>
            {error && <p style={{ color: 'red', margin: '8px 0' }}>{error}</p>}
            <button type="submit" disabled={loading} style={{ width: '100%', padding: 10, borderRadius: 6, background: '#2a2a6a', color: '#fff', fontWeight: 600, border: 'none', marginTop: 8, fontSize: 16, cursor: 'pointer' }}>{loading ? 'Aguarde...' : (mode === 'login' ? 'Entrar' : 'Cadastrar')}</button>
          </form>
          <p style={{ marginTop: 18, fontSize: 15 }}>
            {mode === 'login' ? 'Não tem conta?' : 'Já tem conta?'}{' '}
            <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} style={{ border: 'none', background: 'none', color: '#2a2a6a', cursor: 'pointer', fontWeight: 600, fontSize: 15 }}>
              {mode === 'login' ? 'Cadastre-se' : 'Entrar'}
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
