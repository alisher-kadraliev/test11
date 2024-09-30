'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import JobViewNavbar from './JobViewNavbar';

interface JobPost {
  id: string;
  title: string;
  shortDescription: string;
  price: number;
}

const JobListingPage = () => {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/viewjoblistings');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
    <JobViewNavbar/>
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="job-box bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">{job.title}</h2>
            <p className="text-gray-700 mb-4">{job.shortDescription}</p>
            <div className="flex justify-between items-center">
              <span className="price">${job.price}</span>
              <Link href={`/pages/jobs/${job.id}/apply`} passHref>
                <button className="apply-button">
                  Apply Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default JobListingPage;
