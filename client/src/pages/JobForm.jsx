import { useState } from 'react';
import api from '../services/api'; // 🔥 Using our Axios instance

const JobForm = ({ onJobSaved }) => {
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('Applied');
  const [link, setLink] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/jobs', {
        position,
        company,
        status,
        link,
        notes
      });
      console.log('Job saved:', response.data);
      // Clear form
      setPosition('');
      setCompany('');
      setStatus('Applied');
      setLink('');
      setNotes('');
      onJobSaved(); // 🌀 Refresh job list
    } catch (err) {
      console.error('Save failed:', err.response?.data?.message || err.message);
      alert('Something went wrong while saving the job.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-6 bg-white shadow-md">
      <h3 className="text-lg font-semibold mb-2">Add New Job</h3>

      <input
        type="text"
        placeholder="Position"
        className="border p-2 w-full mb-2"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Company"
        className="border p-2 w-full mb-2"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Application Link (optional)"
        className="border p-2 w-full mb-2"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      <textarea
        placeholder="Notes (e.g., Referred by someone)"
        className="border p-2 w-full mb-2"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <select
        className="border p-2 w-full mb-2"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Applied">Applied</option>
        <option value="Interviewing">Interviewing</option>
        <option value="Rejected">Rejected</option>
        <option value="Offer">Offer</option>
      </select>

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">
        Add Job
      </button>
    </form>
  );
};

export default JobForm;
