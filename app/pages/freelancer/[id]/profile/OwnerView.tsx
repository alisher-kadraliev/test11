'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import OwnerNavbar from './OwnNavbar';
import Image from 'next/image';

const SUPABASE_URL = 'https://rwafyquoghfmktgyihux.supabase.co/storage/v1/object/public/profileimages/';
const DEFAULT_PROFILE_PIC = '/mainimages/defaultimage.jpg';

const OwnerView = ({ freelancerId }: { freelancerId: string }) => {
  const [freelancer, setFreelancer] = useState<any>(null);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    fetch(`/api/freelancer/${freelancerId}/profile`)
      .then((res) => res.json())
      .then((data) => setFreelancer(data));
  }, [freelancerId]);

  if (!freelancer) return <div>Loading...</div>;

  // Construct URL for the Supabase bucket
  const profilePicUrl = freelancer.profilePic 
    ? `${SUPABASE_URL}${freelancer.profilePic}`
    : DEFAULT_PROFILE_PIC;

  return (
    <>
      <OwnerNavbar />
      <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center mb-4 md:mb-6">
          {/* Profile Image */}
          <div className="flex-shrink-0 mb-4 md:mb-0 hidden md:block">
            <Image
              src={profilePicUrl} 
              alt="Profile" 
              width={100}
              height={100}
              className="w-24 h-24 rounded-full" 
              onError={(e) => (e.currentTarget.src = DEFAULT_PROFILE_PIC)}
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center w-full">
            <div className="text-center md:text-left md:mr-4">
              <h1 className="text-xl md:text-2xl font-bold">{freelancer.firstName} {freelancer.lastName}</h1>
              <p className="text-sm md:text-base text-gray-600">{freelancer.province}</p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-2 md:gap-4 md:ml-auto">
              <button 
                className="border border-yellow-500 text-yellow-500 px-3 py-1.5 md:px-4 md:py-2 rounded transition-transform transform hover:scale-105 hover:bg-yellow-100 hover:shadow-lg text-sm md:text-base"
                onClick={() => router.push('/pages/jobs/view')} // Redirect to Jobs page
              >
                Jobs
              </button>
              <button 
                className="border border-yellow-500 text-yellow-500 px-3 py-1.5 md:px-4 md:py-2 rounded transition-transform transform hover:scale-105 hover:bg-yellow-100 hover:shadow-lg text-sm md:text-base"
                onClick={() => router.push(`/create/${freelancerId}/freelancerproedit`)} // Redirect to Edit Profile page
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="mb-6">
              <h2 className="text-lg md:text-xl font-bold">Total Income</h2>
              <p className="text-xl md:text-2xl">${freelancer.totalEarnings.toFixed(2)}</p>
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold flex items-center">
                Skills
                <button className="ml-2 text-yellow-500">+</button>
              </h2>
              <ul>
                {freelancer.skills.map((skill: any, index: number) => (
                  <li key={index} className="text-sm md:text-base">{skill.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="mb-6">
              <h2 className="text-lg md:text-xl font-bold">Description</h2>
              <p className="text-sm md:text-base">{freelancer.description}</p>
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold">Work History</h2>
              <ul>
                {freelancer.workHistory.map((work: any, index: number) => (
                  <li key={index} className="mb-4">
                    <h3 className="font-semibold text-sm md:text-base">{work.jobTitle}</h3>
                    <p className="text-sm md:text-base">{work.description}</p>
                    <p className="text-xs md:text-sm">
                      {new Date(work.startDate).toLocaleDateString()} - {work.endDate ? new Date(work.endDate).toLocaleDateString() : 'Present'}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerView;
