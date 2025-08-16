import React from 'react';

import BibleExplorer from './components/BibleExplorer';
import PdfIngestor from './components/PdfIngestor';
import SemanticSearch from './components/SemanticSearch';
import SermonAssistant from './components/SermonAssistant';
import AuthForm from './components/AuthForm';
import UserPanel from './components/UserPanel';
import PaymentPanel from './components/PaymentPanel';


function App() {
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
    <div>
      <h1>Eklesia IA</h1>
      <p style={{ textAlign: 'right' }}>
        Olá, {user?.name || user?.email}! <button onClick={handleLogout}>Sair</button>
      </p>
  <UserPanel token={token} />
  <PaymentPanel token={token} />
      <SermonAssistant />
      <hr />
      <BibleExplorer />
      <hr />
      <PdfIngestor />
      <hr />
      <SemanticSearch userId={user?.id || 1} />
    </div>
  );
}

export default App;
