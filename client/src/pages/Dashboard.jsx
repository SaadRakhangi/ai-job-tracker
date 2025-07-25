import JobForm from './JobForm';
import JobList from './JobList';
import { useState } from 'react';

const Dashboard = () => {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleJobSaved = () => {
    // Toggle flag to re-render JobList
    setRefreshFlag(!refreshFlag);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <JobForm onJobSaved={handleJobSaved} />
      <JobList key={refreshFlag} />
    </div>
  );
};

export default Dashboard;
