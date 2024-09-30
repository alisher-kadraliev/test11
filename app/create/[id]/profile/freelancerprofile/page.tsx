'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Freelancer {
  id: string;
  profilePic: string;
  firstName: string;
  lastName: string;
  description: string;
  skills: string[];
  totalEarnings: number;
  workHistory: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

const FreelancerProfile: React.FC = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<Freelancer | null>(null);
  const [editingSkills, setEditingSkills] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`/api/freelancer/${id}`);
      const data: Freelancer = await response.json();
      setProfile(data);
      setSkills(data.skills || []);
    };

    fetchProfile();
  }, [id]);

  const handleAddSkill = async () => {
    if (newSkill.trim() === '') return;

    const updatedSkills = [...skills, newSkill.trim()];
    setSkills(updatedSkills);
    setNewSkill('');

    await fetch(`/api/freelancer/${id}/skills`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ skills: updatedSkills }),
    });
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex">
        <Image
          src={profile.profilePic || '/default-profile.png'}
          alt="Profile"
          width={100}
          height={100}
          className="w-32 h-32 rounded-full"
        />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h1>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Description</h2>
        <p>{profile.description}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Skills</h2>
        {editingSkills ? (
          <div>
            <ul>
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
            <Input 
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a new skill"
            />
            <Button onClick={handleAddSkill}>Add Skill</Button>
            <Button onClick={() => setEditingSkills(false)}>Save Skills</Button>
          </div>
        ) : (
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Total Earnings</h2>
        <p>{profile.totalEarnings}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Work History</h2>
        <ul>
          {profile.workHistory.map((job, index) => (
            <li key={index}>{job.title} - {job.description}</li>
          ))}
        </ul>
      </div>
      <Button onClick={() => router.push(`/edit-profile/${id}`)}>Edit Profile</Button>
    </div>
  );
};

export default FreelancerProfile;
