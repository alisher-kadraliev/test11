"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserTie, FaBriefcase } from 'react-icons/fa';

const RoleSelection = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRoleSelection = async (role: string) => {
    setLoading(true);
    try {
      const response = await fetch('@/app/api/role-selection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roleName: role }),
      });

      if (response.ok) {
        const redirectUrl = role === 'Freelancer' 
          ? '/dashboard/freelancer' 
          : '/dashboard/client';
        router.push(redirectUrl);
      } else {
        console.error('Failed to select role');
      }
    } catch (error) {
      console.error('Error selecting role:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-yellow-500 mb-12">Register As a</h1>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
        <div
          onClick={() => handleRoleSelection('Freelancer')}
          className="cursor-pointer aspect-square flex flex-col items-center justify-center text-center text-gray-800 bg-white border-2 border-gray-800 rounded-lg shadow-lg hover:bg-yellow-500 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <FaUserTie className="text-6xl mb-2" />
          <span className="text-xl font-semibold">Freelancer</span>
        </div>
        <div
          onClick={() => handleRoleSelection('Client')}
          className="cursor-pointer aspect-square flex flex-col items-center justify-center text-center text-gray-800 bg-white border-2 border-gray-800 rounded-lg shadow-lg hover:bg-yellow-500 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <FaBriefcase className="text-6xl mb-2" />
          <span className="text-xl font-semibold">Client</span>
        </div>
      </div>
      {loading && <p className="text-yellow-500 mt-4">Loading...</p>}
    </div>
  );
};

export default RoleSelection;
