'use client'

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ClientCTA() {
  const router = useRouter();

  const handleStartClick = async () => {
    try {
      const response = await fetch('/api/getclientid');
      if (!response.ok) {
        throw new Error('Failed to fetch client ID');
      }

      const data = await response.json();
      const clientId = data.clientId;

      if (clientId) {
        router.push(`/create/${clientId}/clientproedit`);
      } else {
        throw new Error('Client ID not found');
      }
    } catch (error) {
      console.error('Error fetching client ID:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <section className="bg-white py-20 px-6 rounded-lg shadow-lg text-center">
        <h2 className="text-4xl font-bold mb-4">Are You Ready to be a Client?</h2>
        <p className="text-xl text-gray-700 mb-8">
          Connect with top freelancers, manage projects efficiently, and grow your business.
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
