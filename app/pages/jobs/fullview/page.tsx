'use client'

import React, { useEffect, useState } from 'react';

interface JobPost {
  id: string;
  title: string;
  shortDescription: string;
  price: number;
}

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobPost[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/joblist');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-wrap gap-6">
       {/*  {jobs.map((job) => (
          <div key={job.id} className="job-box-container">
            <div className="job-box-content">
              <h2 className="text-xl font-bold">{job.title}</h2>
              <p>{job.shortDescription}</p>
              <span className="font-bold text-lg">Price: ${job.price}</span>
              <a
                href={`/apply/${job.id}`}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4 block text-center"
              >
                Apply Now
              </a>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default JobsPage;
