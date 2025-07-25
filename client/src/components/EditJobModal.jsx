import { useState, useEffect } from 'react';
import api from '../services/api';

const EditJobModal = ({ job, isOpen, onClose, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('Applied');

  // 🧠 Prefill form when modal opens
  useEffect(() => {
    if (job) {
      setTitle(job.position);
      setCompany(job.company);
      setStatus(job.status);
    }
  }, [job]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/jobs/${job._id}`, {
        position: title,
        company,
        status,
      });
      alert('Job updated!');
      onUpdate(); // 🔁 Refresh job list
      onClose();  // ❌ Close modal
    } catch (err) {
      console.error('Update failed:', err.response?.data?.message || err.message);
      alert('Failed to update job.');
    }
  };

  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Job</h2>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            className="w-full p-2 border mb-2"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            className="w-full p-2 border mb-2"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
          <select
            className="w-full p-2 border mb-4"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Offer</option>
          </select>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobModal;
