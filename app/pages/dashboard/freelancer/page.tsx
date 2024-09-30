'use client'

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function CTA() {
  const router = useRouter();

  const handleStartClick = async () => {
    try {
      const response = await fetch('/api/getfreelancerid');
      if (!response.ok) {
        throw new Error('Failed to fetch freelancer ID');
      }

      const data = await response.json();
      const freelancerId = data.freelancerId;

      if (freelancerId) {
        router.push(`/create/${freelancerId}/freelancerproedit`);
      } else {
        throw new Error('Freelancer ID not found');
      }
    } catch (error) {
      console.error('Error fetching freelancer ID:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <section className="bg-white py-20 px-6 rounded-lg shadow-lg text-center">
        <h2 className="text-4xl font-bold mb-4">Are You Ready to be a Freelancer?</h2>
        <p className="text-xl text-gray-700 mb-8">
          Take control of your career, work on exciting projects, and join a vibrant community of professionals.
        </p>
        
        <Button 
          className="hover:bg-yellow-600 text-lg px-6 py-3 text-white"
          onClick={handleStartClick}
        >
          Let&apos;s Start!
        </Button>
      </section>
    </div>
  );
}
