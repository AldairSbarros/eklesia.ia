import React from 'react';

export default function SermonExport({ sermon, token }) {
  const handleExport = async () => {
    const res = await fetch('http://localhost:3001/sermon/export-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(sermon)
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sermao-eklesia-${Date.now()}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleExport} disabled={!sermon} style={{ marginTop: 12 }}>
      Exportar Sermão em PDF
    </button>
  );
}
