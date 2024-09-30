import Image from 'next/image';
import React from 'react';

interface ProfileHeaderProps {
  profilePic: string;
  firstName: string;
  lastName: string;
  isClientView: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profilePic, firstName, lastName, isClientView }) => {
  return (
    <div className="flex items-center mb-4">
      <Image src={profilePic} alt="Profile Picture" className="w-32 h-32 rounded-full object-cover" width={32} height={32} />

      <div className="ml-4">
        <h1 className="text-2xl font-bold">{firstName} {lastName}</h1>
        {isClientView && <button className="ml-4 bg-yellow-500 text-white px-4 py-2 rounded">Hire Me</button>}
      </div>
    </div>
  );
};

export default ProfileHeader;
