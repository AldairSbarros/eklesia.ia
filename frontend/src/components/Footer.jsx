import React from 'react';

export default function Footer() {
  return (
    <footer style={{ width: '100%', background: '#f7fafd', borderTop: '1px solid #e0e0e0', textAlign: 'center', padding: '16px 0', color: '#2a2a6a', fontSize: 15, marginTop: 32 }}>
      © {new Date().getFullYear()} Eklesia IA — Todos os direitos reservados
    </footer>
  );
}
