// pages/mypages/jobs/[id]/apply/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface JobPost {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  fileUrls: string[];
}

const ApplyPage: React.FC = () => {
  const [jobPost, setJobPost] = useState<JobPost | null>(null);
  const [proposal, setProposal] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [freelancerId, setFreelancerId] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    console.log('Job ID from params:', id); // Log the job ID

    const fetchJob = async () => {
      try {
        if (!id) {
          console.error('Job ID is null');
          return;
        }

        const response = await fetch(`/api/job/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched job data:', data); // Log the fetched job data
        setJobPost(data);
      } catch (error) {
        console.error('Failed to fetch job details:', error);
      }
    };

    const fetchFreelancerId = async () => {
      try {
        const response = await fetch('/api/getfreelancerid');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFreelancerId(data.freelancerId);
      } catch (error) {
        console.error('Failed to fetch freelancer ID:', error);
      }
    };

    fetchJob();
    fetchFreelancerId();
  }, [id]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFiles(Array.from(selectedFiles));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!freelancerId) {
      console.error('Freelancer ID is null');
      return;
    }

    if (!jobPost?.id) {
      console.error('Job ID is null');
      return;
    }

    const formData = new FormData();
    formData.append('jobId', jobPost.id);
    formData.append('proposal', proposal);
    formData.append('freelancerId', freelancerId);

    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('/api/submitproposal', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      router.push('/pages/jobs/view');
    } catch (error) {
      console.error('Failed to submit proposal:', error);
    }
  };

  if (!jobPost) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto lg:max-w-full form-container">
        <h1 className="text-2xl font-bold mb-4">{jobPost.title}</h1>
        <p className="text-lg mb-4">{jobPost.fullDescription}</p>
        <div className="flex flex-wrap gap-4 mb-4">
          {jobPost.fileUrls.map((url, index) => (
            <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              File {index + 1}
            </a>
          ))}
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Your Proposal</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              rows={6}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Write your proposal here..."
              required
            />
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Attach Files</label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit Your Proposal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
