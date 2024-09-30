import React from 'react';

interface WorkHistoryItem {
  jobTitle: string;
  description: string;
}

interface ProfileDetailsProps {
  totalEarnings: number;
  description: string;
  workHistory: WorkHistoryItem[];
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ totalEarnings, description, workHistory }) => {
  return (
    <div className="flex">
      <div className="w-1/3">
        <h2 className="text-xl font-bold">Total Earnings</h2>
        <p>${totalEarnings.toFixed(2)}</p>
      </div>
      <div className="w-2/3">
        <h2 className="text-xl font-bold">Description</h2>
        <p>{description}</p>
        <h2 className="text-xl font-bold mt-4">Work History</h2>
        {workHistory.map((job: WorkHistoryItem, index: number) => (
          <div key={index} className="mb-2">
            <h3 className="text-lg font-semibold">{job.jobTitle}</h3>
            <p>{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileDetails;
