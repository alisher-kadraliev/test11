'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AllProposalNavBar from './AllProposalNavBar';

const AllProposals = () => {
  const [proposals, setProposals] = useState<any[]>([]);
  const [jobTitle, setJobTitle] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string | undefined;

  useEffect(() => {
    if (jobId) {
      const fetchProposals = async () => {
        try {
          const response = await fetch(`/api/proposals/${jobId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch proposals');
          }
          const data = await response.json();
          setJobTitle(data.jobTitle); // Set job title
          setProposals(data.proposals); // Set proposals
        } catch (err) {
          setError((err as Error).message);
        }
      };

      fetchProposals();
    }
  }, [jobId]);

  const handleHire = (freelancerId: string, freelancerName: string) => {
    // Redirect to the chat page or other hiring logic
    router.push(`/pages/chat?jobId=${jobId}&freelancerId=${freelancerId}&freelancerName=${encodeURIComponent(freelancerName)}`);
  };

  const handlePayment = (freelancerId: string, freelancerName: string) => {
    // Redirect to the payment page
    router.push(`/pages/payment?jobId=${jobId}&freelancerId=${freelancerId}&freelancerName=${encodeURIComponent(freelancerName)}`);
  };

  if (error) return <div>Error: {error}</div>;
  if (proposals.length === 0) return <div>No proposals available.</div>;

  return (
    <>
      <AllProposalNavBar />
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Proposals for Job: {jobTitle}</h1>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="border rounded-lg p-4 shadow-sm relative">
              <h2 className="text-lg font-semibold text-gray-800">{proposal.freelancer.name}</h2>
              <p className="text-gray-600 mt-2">{proposal.proposal}</p>
              <button
                className="absolute bottom-4 right-24 bg-green-500 text-white px-4 py-2 rounded shadow-lg"
                onClick={() => handlePayment(proposal.freelancerId, proposal.freelancer.name)}
              >
                Pay
              </button>
              <button
                className="absolute bottom-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded shadow-lg"
                onClick={() => handleHire(proposal.freelancerId, proposal.freelancer.name)}
              >
                Hire
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProposals;
