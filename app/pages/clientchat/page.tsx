'use client'

import { useEffect, useState } from 'react';
import { Session, Inbox } from '@talkjs/react';
import { useRouter } from 'next/navigation';

const Chat = () => {
  const [clientId, setClientId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchClientId = async () => {
      try {
        // Replace with the actual endpoint or logic to get Client ID
        const response = await fetch(`/api/getclientid`);
        const data = await response.json();
        setClientId(data.clientId);
      } catch (error) {
        console.error('Failed to fetch Client ID:', error);
      }
    };

    fetchClientId();
  }, []);

  if (!clientId) {
    return <div>Loading...</div>;
  }

  return (
    <Session appId="tEnIkiMW" userId={clientId}>
      <Inbox conversationId="sample_conversation" 
      style={{ width: '100%', height: '100vh' }}/>
      
    </Session>
  );
};

export default Chat;
