import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Compartilhar from './pages/Compartilhar';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/compartilhar/:shareId" element={<Compartilhar />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
