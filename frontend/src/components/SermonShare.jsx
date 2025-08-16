import React, { useState } from 'react';

export default function SermonShare({ sermon, token }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    setLoading(true);
    setUrl('');
    const res = await fetch('http://localhost:3001/share/sermon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(sermon)
    });
    const data = await res.json();
    setUrl(data.url);
    setLoading(false);
  };

  return (
    <div style={{ marginTop: 12 }}>
      <button onClick={handleShare} disabled={!sermon || loading}>
        Compartilhar por Link
      </button>
      {url && (
        <div style={{ marginTop: 8 }}>
          <input value={url} readOnly style={{ width: '80%' }} />
          <button onClick={() => navigator.clipboard.writeText(url)}>Copiar</button>
          <a href={`https://wa.me/?text=${encodeURIComponent('Veja este sermão: ' + url)}`} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8 }}>
            Enviar por WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
