import React, { useState } from 'react';
import { login, register } from '../services/authApi';

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
    <div style={{ maxWidth: 350, margin: '32px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>{mode === 'login' ? 'Entrar' : 'Cadastrar'}</h2>
      <form onSubmit={handleSubmit}>
        {mode === 'register' && (
          <div>
            <label>Nome:</label>
            <input value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%' }} />
          </div>
        )}
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%' }} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Aguarde...' : (mode === 'login' ? 'Entrar' : 'Cadastrar')}</button>
      </form>
      <p style={{ marginTop: 12 }}>
        {mode === 'login' ? 'Não tem conta?' : 'Já tem conta?'}{' '}
        <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} style={{ border: 'none', background: 'none', color: '#2a2a6a', cursor: 'pointer' }}>
          {mode === 'login' ? 'Cadastre-se' : 'Entrar'}
        </button>
      </p>
    </div>
  );
}
