'use client'

import { useEffect, useState } from 'react';
import { Session, Inbox } from '@talkjs/react';
import { useRouter } from 'next/navigation';

const Chat = () => {
  const [freelancerId, setFreelancerId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFreelancerId = async () => {
      try {
        // Replace with the actual endpoint or logic to get freelancer ID
        const response = await fetch(`/api/getfreelancerid`);
        const data = await response.json();
        setFreelancerId(data.freelancerId);
      } catch (error) {
        console.error('Failed to fetch freelancer ID:', error);
      }
    };

    fetchFreelancerId();
  }, []);

  if (!freelancerId) {
    return <div>Loading...</div>;
  }

  return (
    <Session appId="tEnIkiMW" userId={freelancerId}>
      <Inbox conversationId="sample_conversation" 
      style={{ width: '100%', height: '100vh' }}/>
    </Session>
  );
};

export default Chat;
