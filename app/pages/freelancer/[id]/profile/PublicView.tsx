'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const SUPABASE_URL = 'https://rwafyquoghfmktgyihux.supabase.co/storage/v1/object/public/profileimages/';
const DEFAULT_PROFILE_PIC = '/mainimages/defaultimage.jpg';

const PublicView = ({ freelancerId }: { freelancerId: string }) => {
  const [freelancer, setFreelancer] = useState<any>(null);

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

  // Safely handle totalEarnings
  const totalEarnings = freelancer.totalEarnings ?? 0;

  // Default values for skills and workHistory
  const skills = freelancer.skills ?? [];
  const workHistory = freelancer.workHistory ?? [];

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Image 
          src={profilePicUrl} 
          alt="Profile" 
          width={100}
          height={100}
          className="w-24 h-24 rounded-full" 
          onError={(e) => (e.currentTarget.src = DEFAULT_PROFILE_PIC)}
        />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{freelancer.firstName} {freelancer.lastName}</h1>
          <p className="text-gray-600">{freelancer.province}</p>
        </div>
        <button className="ml-auto border border-yellow-500 text-yellow-500 px-4 py-2 rounded">
          Hire Me
        </button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Total Income</h2>
            <p className="text-2xl">${totalEarnings.toFixed(2)}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Skills</h2>
            <ul>
              {skills.map((skill: any, index: number) => (
                <li key={index}>{skill.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-2">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Description</h2>
            <p>{freelancer.description}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Work History</h2>
            <ul>
              {workHistory.map((work: any, index: number) => (
                <li key={index}>
                  <h3>{work.jobTitle}</h3>
                  <p>{work.description}</p>
                  <p>{new Date(work.startDate).toLocaleDateString()} - {work.endDate ? new Date(work.endDate).toLocaleDateString() : 'Present'}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicView;
