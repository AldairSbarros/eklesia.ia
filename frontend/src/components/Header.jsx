import React from 'react';
import logo from '../assets/EklesiaKonecta-xOe6Dru8.png';

export default function Header() {
  return (
    <header style={{ width: '100%', background: '#f7fafd', borderBottom: '1px solid #e0e0e0', marginBottom: 24, padding: '12px 0 0 0', textAlign: 'center', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 12px #b6c2e122' }}>
      <img src={logo} alt="Logo Eklesia IA" style={{ height: 60, margin: '0 auto', display: 'block' }} />
      <div style={{ fontWeight: 700, fontSize: 24, color: '#2a2a6a', marginTop: 4, marginBottom: 8 }}>Eklesia IA</div>
    </header>
  );
}
