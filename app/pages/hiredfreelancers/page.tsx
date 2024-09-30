'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const HiredFreelancers = () => {
  const [hiredData, setHiredData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { id: jobId } = useParams();

  useEffect(() => {
    const fetchClientId = async () => {
      try {
        const response = await fetch('/api/getclientid');
        if (!response.ok) {
          throw new Error('Failed to fetch client ID');
        }
        const { clientId } = await response.json();

        if (jobId && clientId) {
          const response = await fetch(`/api/hire/${clientId}/${jobId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch hired data');
          }
          const data = await response.json();
          setHiredData(data);
        }
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchClientId();
  }, [jobId]);

  if (error) return <div>Error: {error}</div>;
  if (!hiredData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Job Details</h1>
      <p>Job Title: {hiredData.jobTitle}</p>
      <p>Freelancer: {hiredData.freelancerFirstName} {hiredData.freelancerLastName}</p>
      <button onClick={() => handlePayment(hiredData)}>Pay</button>
    </div>
  );
};

const handlePayment = (data: any) => {
  // Implement your payment logic here
  console.log('Payment data:', data);
};

export default HiredFreelancers;
