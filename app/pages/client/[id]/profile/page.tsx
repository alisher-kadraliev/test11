'use client'

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ClientNavbar from './ClientNavbar';
import Image from 'next/image';

const ClientDashboardOwner = () => {
  const [client, setClient] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams(); // Use `useParams` to get route parameters
  const router = useRouter(); // Use `useRouter` for programmatic navigation
  const id = params.id as string | undefined; // Extract `id` from URL parameters

  useEffect(() => {
    if (id) {
      const fetchClientData = async () => {
        try {
          const response = await fetch(`/api/client/${id}/profile`);
          if (!response.ok) {
            throw new Error('Failed to fetch client data');
          }
          const data = await response.json();
          setClient(data);
        } catch (err) {
          setError((err as Error).message);
        }
      };

      fetchClientData();
    }
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!client) return <div>Loading...</div>;

  // Construct the URL for the profile picture
  const profilePicUrl = client.profilePic
    ? `https://rwafyquoghfmktgyihux.supabase.co/storage/v1/object/public/profileimages/${client.profilePic}`
    : '/mainimages/defaultimage.jpg';

  // Function to handle the redirection
  const handleProposalClick = (jobId: string) => {
    router.push(`/pages/proposal/${jobId}/allproposals`);
  };

  // Function to handle the edit profile redirection
  const handleEditProfileClick = () => {
    router.push(`/create/${id}/clientproedit`);
  };

  return (
    <>
      <ClientNavbar />
      <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center mb-4 md:mb-6">
          {/* Profile Image */}
          <div className="flex-shrink-0 hidden md:block">
            <Image
              src={profilePicUrl}
              alt="Profile"
              width={100}
              height={100}
              className="w-16 h-16 md:w-24 md:h-24 rounded-full"
            />
          </div>
          <div className="flex flex-col md:flex-row md:ml-4 mt-4 md:mt-0 w-full">
            <div className="text-center md:text-left">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                {client.firstName} {client.lastName}
              </h1>
              <p className="text-sm md:text-base text-gray-600">{client.province}</p>
            </div>
            <div className="mt-4 md:mt-0 md:ml-auto flex flex-col md:flex-row gap-2 md:gap-4">
            <button
                className="border border-yellow-500 text-yellow-500 px-3 py-1.5 md:px-4 md:py-2 rounded transition-transform transform hover:scale-105 hover:bg-yellow-100 hover:shadow-lg text-sm md:text-base"
                onClick={() => router.push('/pages/jobs/post')} // Redirect to Jobs page
              >
                Post a Job
              </button>
              
              <button
                className="border border-yellow-500 text-yellow-500 px-3 py-1.5 md:px-4 md:py-2 rounded transition-transform transform hover:scale-105 hover:bg-yellow-100 hover:shadow-lg text-sm md:text-base"
                onClick={handleEditProfileClick} // Redirect to Edit Profile page
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        <hr className="my-4 md:my-6 border-t border-gray-300" />
        <div>
          <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-800">Active Jobs</h2>
          <ul className="space-y-2">
            {client.JobPost.map((job: any) => (
              <li
                key={job.id}
                className="flex items-center justify-between text-yellow-600 font-semibold text-sm md:text-base"
              >
                <span>{job.title}</span>
                {job.status === 'hired' ? (
                  <button
                    className="text-green-500 hover:underline text-xs md:text-sm"
                    onClick={() => handleProposalClick(job.id)}
                  >
                    Chat
                  </button>
                ) : (
                  <button
                    className="text-blue-500 hover:underline text-xs md:text-sm"
                    onClick={() => handleProposalClick(job.id)}
                  >
                    Proposals
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-4 md:my-6 border-t border-gray-300" />
        <div>
          <h2 className="text-lg md:text-xl font-bold mt-6 mb-3 md:mb-4 text-gray-800">Completed Jobs</h2>
          <ul className="space-y-2">
            {client.CompletedJob.map((job: any) => (
              <li key={job.id} className="text-gray-600 text-sm md:text-base">
                {job.job.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ClientDashboardOwner;
