import React, { useState, useEffect } from 'react';
import { getLanguages, getBibles, getBooks, getChapters, getVerse, getAudio, getVideo } from '../services/bibleApi';

export default function BibleExplorer() {
  const [languages, setLanguages] = useState([]);
  const [bibles, setBibles] = useState([]);
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [selected, setSelected] = useState({ language: '', bible: '', book: '', chapter: '', verse: '' });
  const [verse, setVerse] = useState(null);
  const [audio, setAudio] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => { getLanguages().then(setLanguages); }, []);

  useEffect(() => {
    if (selected.language) getBibles(selected.language).then(setBibles);
  }, [selected.language]);

  useEffect(() => {
    if (selected.bible) getBooks(selected.bible).then(setBooks);
  }, [selected.bible]);

  useEffect(() => {
    if (selected.bible && selected.book) getChapters(selected.bible, selected.book).then(setChapters);
  }, [selected.bible, selected.book]);

  const handleVerse = async () => {
    const v = await getVerse(selected.bible, selected.book, selected.chapter, selected.verse);
    setVerse(v);
    setAudio(null); setVideo(null);
  };
  const handleAudio = async () => {
    const a = await getAudio(selected.bible, selected.book, selected.chapter);
    setAudio(a); setVerse(null); setVideo(null);
  };
  const handleVideo = async () => {
    const v = await getVideo(selected.bible, selected.book, selected.chapter);
    setVideo(v); setVerse(null); setAudio(null);
  };

  return (
    <div>
      <h2>Explorar Bíblia</h2>
      <div>
        <label>Idioma:</label>
        <select value={selected.language} onChange={e => setSelected(s => ({ ...s, language: e.target.value, bible: '', book: '', chapter: '', verse: '' }))}>
          <option value="">Selecione</option>
          {languages.map(l => <option key={l.language_code} value={l.language_code}>{l.language_name}</option>)}
        </select>
      </div>
      {bibles.length > 0 && (
        <div>
          <label>Versão:</label>
          <select value={selected.bible} onChange={e => setSelected(s => ({ ...s, bible: e.target.value, book: '', chapter: '', verse: '' }))}>
            <option value="">Selecione</option>
            {bibles.map(b => <option key={b.bible_id} value={b.bible_id}>{b.bible_name}</option>)}
          </select>
        </div>
      )}
      {books.length > 0 && (
        <div>
          <label>Livro:</label>
          <select value={selected.book} onChange={e => setSelected(s => ({ ...s, book: e.target.value, chapter: '', verse: '' }))}>
            <option value="">Selecione</option>
            {books.map(b => <option key={b.book_id} value={b.book_id}>{b.book_name}</option>)}
          </select>
        </div>
      )}
      {chapters.length > 0 && (
        <div>
          <label>Capítulo:</label>
          <select value={selected.chapter} onChange={e => setSelected(s => ({ ...s, chapter: e.target.value, verse: '' }))}>
            <option value="">Selecione</option>
            {chapters.map(c => <option key={c.chapter_id} value={c.chapter_id}>{c.chapter_id}</option>)}
          </select>
        </div>
      )}
      {selected.chapter && (
        <div>
          <label>Versículo:</label>
          <input type="number" min="1" value={selected.verse} onChange={e => setSelected(s => ({ ...s, verse: e.target.value }))} />
          <button onClick={handleVerse}>Buscar Versículo</button>
          <button onClick={handleAudio}>Áudio</button>
          <button onClick={handleVideo}>Vídeo</button>
        </div>
      )}
      {verse && <pre>{JSON.stringify(verse, null, 2)}</pre>}
      {audio && <pre>{JSON.stringify(audio, null, 2)}</pre>}
      {video && <pre>{JSON.stringify(video, null, 2)}</pre>}
    </div>
  );
}
