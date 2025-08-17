
import React, { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

import BibleExplorer from './components/BibleExplorer';
import ExploradorBiblico from './components/ExploradorBiblico';
import HermeneuticaBox from './components/HermeneuticaBox';
import PdfIngestor from './components/PdfIngestor';
import SemanticSearch from './components/SemanticSearch';
import SermonAssistant from './components/SermonAssistant';
import AuthForm from './components/AuthForm';
import UserPanel from './components/UserPanel';
import PaymentPanel from './components/PaymentPanel';


function App() {
  useEffect(() => {
    document.body.style.background = '#f3f6fa';
  }, []);
  const [token, setToken] = React.useState(() => localStorage.getItem('token'));
  const [user, setUser] = React.useState(() => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });

  const handleAuth = (tk, u) => {
    setToken(tk);
    setUser(u);
    localStorage.setItem('token', tk);
    localStorage.setItem('user', JSON.stringify(u));
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (!token) {
    return <AuthForm onAuth={handleAuth} />;
  }

  return (
    <>
      <Header />
      <div style={{ minHeight: '100vh', background: '#e3eaf3', maxWidth: 900, margin: '0 auto', padding: 24, borderRadius: 18, boxShadow: '0 4px 32px #b6c2e122' }}>
        {/* Título movido para o Header */}
        <p style={{ textAlign: 'right' }}>
          Olá, {user?.name || user?.email}! <button onClick={handleLogout}>Sair</button>
        </p>
        <UserPanel token={token} user={user} />
        {user?.role !== 'superuser' && <PaymentPanel token={token} />}
        <SermonAssistant />
        <hr />
        <BibleExplorer />
        <ExploradorBiblico />
        <HermeneuticaBox />
        <hr />
        <PdfIngestor />
        <hr />
        <SemanticSearch userId={user?.id || 1} />
      </div>
      <Footer />
    </>
  );
}

export default App;
