'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  shortDescription: string;
  price: number;
}

const JobListPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Fetch job listings from API
    const fetchJobs = async () => {
      const response = await fetch('/api/joblist');
      const data = await response.json();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {jobs.map(job => (
          <div key={job.id} className="relative bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold">{job.title}</h3>
            <p className="text-gray-700 mt-2">{job.shortDescription}</p>
            <p className="absolute bottom-4 left-4 text-green-600 font-semibold">${job.price}</p>
            <Link href={`/jobs/${job.id}`}>
              <a className="absolute bottom-4 right-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                Apply Now
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListPage;
