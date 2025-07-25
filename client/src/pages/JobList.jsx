import { useState, useEffect } from 'react';
import api from '../services/api';
import EditJobModal from '../components/EditJobModal';


const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      alert('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job?')) return;
    try {
      await api.delete(`/jobs/${id}`);
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h3 className="text-xl font-bold mb-4">Your Jobs</h3>
      {jobs.map((job) => (
        <div key={job._id} className="p-4 border rounded mb-2 bg-white shadow">
          <p><strong>Title:</strong> {job.position}</p>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Status:</strong> {job.status}</p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => handleEdit(job)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(job._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* 🔍 Edit Modal */}
      <EditJobModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onUpdate={fetchJobs}
      />
    </>
  );
};

export default JobList;
