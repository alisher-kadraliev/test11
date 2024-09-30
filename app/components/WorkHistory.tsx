import React, { useEffect, useState } from 'react';

interface WorkHistory {
  id: string;
  jobTitle: string;
  description: string;
  startDate: string;
  endDate?: string;
}

const WorkHistory: React.FC<{ freelancerId: string }> = ({ freelancerId }) => {
  const [workHistory, setWorkHistory] = useState<WorkHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkHistory = async () => {
      const response = await fetch(`/api/freelancer/${freelancerId}/workhistory`);
      const data = await response.json();
      setWorkHistory(data);
      setLoading(false);
    };

    fetchWorkHistory();
  }, [freelancerId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Work History</h2>
      <ul>
        {workHistory.map((work) => (
          <li key={work.id}>
            <h3>{work.jobTitle}</h3>
            <p>{work.description}</p>
            <p>
              {new Date(work.startDate).toLocaleDateString()} -{' '}
              {work.endDate ? new Date(work.endDate).toLocaleDateString() : 'Present'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkHistory;
