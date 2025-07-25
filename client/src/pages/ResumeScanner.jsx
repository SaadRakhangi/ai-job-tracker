import { useState } from 'react';
import axios from 'axios';

const ResumeScanner = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [aiSummary, setAiSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setExtractedText('');
    setAiSummary('');
  };

  const handleScan = async () => {
    if (!file) return alert('Please select a resume PDF.');
    setLoading(true);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const scanRes = await axios.post('http://localhost:5000/api/ai/scan-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setExtractedText(scanRes.data.text);

      const analyzeRes = await axios.post('http://localhost:5000/api/ai/analyze-resume', {
        text: scanRes.data.text,
      });

      setAiSummary(analyzeRes.data.summary);
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">📄 Resume Scanner</h2>

      <input type="file" accept=".pdf" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleScan}
        disabled={!file || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Scanning...' : 'Upload & Analyze'}
      </button>

      {aiSummary && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">🧠 AI Summary:</h3>
          <p className="whitespace-pre-wrap bg-gray-100 p-3 rounded">{aiSummary}</p>
        </div>
      )}
    </div>
  );
};

export default ResumeScanner;
