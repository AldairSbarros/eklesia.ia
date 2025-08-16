
export default function PdfIngestor() {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('pdf');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFile = e => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    let url = 'http://localhost:3001/ingest/pdf';
    if (fileType === 'docx') url = 'http://localhost:3001/ingest/docx';
    if (fileType === 'html') url = 'http://localhost:3001/ingest/html';
    try {
      const { data } = await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setText(data.text);
    } catch (err) {
      setText('Erro ao processar arquivo: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Ingestão de Arquivos</h2>
      <select value={fileType} onChange={e => setFileType(e.target.value)}>
        <option value="pdf">PDF</option>
        <option value="docx">DOCX</option>
        <option value="html">HTML</option>
      </select>
      <input
        type="file"
        accept={fileType === 'pdf' ? 'application/pdf' : fileType === 'docx' ? '.docx' : '.html,text/html'}
        onChange={handleFile}
      />
      <button onClick={handleUpload} disabled={loading}>Enviar</button>
      {loading && <p>Processando...</p>}
      {text && <pre style={{ maxHeight: 200, overflow: 'auto' }}>{text}</pre>}
    </div>
  );
}
