'use client';

import { useEffect, useState, useCallback } from 'react';
import Talk from 'talkjs';
import { Session, Inbox } from '@talkjs/react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react'; // Import Suspense

const ChatComponents = () => {
    const [client, setClient] = useState<any>(null);
    const [freelancer, setFreelancer] = useState<any>(null);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const searchParams = useSearchParams();

    // Extract URL parameters
    const jobId = searchParams.get('jobId') || '';
    const freelancerId = searchParams.get('freelancerId') || '';
    const freelancerName = searchParams.get('freelancerName') || '';

    console.log('jobId:', jobId);
    console.log('freelancerId:', freelancerId);
    console.log('freelancerName:', freelancerName);

    useEffect(() => {
        if (jobId && freelancerId) {
            const fetchData = async () => {
                try {
                    console.log('Fetching data...');
                    // Fetch client details using the jobId
                    const clientResponse = await fetch(`/api/chatredirection/client/${jobId}`);
                    const freelancerResponse = await fetch(`/api/chatredirection/freelancer/${freelancerId}`);

                    console.log('Client response:', clientResponse);
                    console.log('Freelancer response:', freelancerResponse);

                    if (!clientResponse.ok || !freelancerResponse.ok) {
                        throw new Error('Failed to fetch data');
                    }

                    const clientData = await clientResponse.json();
                    const freelancerData = await freelancerResponse.json();

                    console.log('Client data:', clientData);
                    console.log('Freelancer data:', freelancerData);

                    setClient(clientData);
                    setFreelancer(freelancerData);
                    setConversationId(`${clientData.id}-${freelancerId}`); // Use clientData.id
                } catch (err) {
                    console.error('Error fetching data:', err);
                }
            };

            fetchData();
        }
    }, [jobId, freelancerId]);

    const getUser = useCallback(() => {
        const clientUser = new Talk.User({
            id: client?.id || 'default-user-id',
            name: client?.firstName || 'Guest User',
            email: `${client?.id || 'guest'}@example.com`,
            photoUrl: client?.profileImage || 'https://talkjs.com/new-web/avatar-7.jpg',
        });

        return clientUser;
    }, [client]);

    const syncConversation = useCallback((session: any) => {
        if (!conversationId || !client || !freelancer) return null;

        const conversation = session.getOrCreateConversation(conversationId);

        const me = getUser();
        if (me) conversation.setParticipant(me);

        const other = new Talk.User({
            id: freelancer.id,
            name: freelancer.firstName,
            email: `${freelancer.id}@example.com`,
            photoUrl: freelancer.profilePic || 'https://talkjs.com/new-web/avatar-8.jpg',
        });
        conversation.setParticipant(other);

        return conversation;
    }, [getUser, freelancer, conversationId, client]);

    if (!client || !freelancer) return <div>Loading...</div>;

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Session appId="tEnIkiMW" syncUser={getUser}>
                <Inbox syncConversation={syncConversation} style={{ width: '100%', height: '100vh' }} />
            </Session>
        </Suspense>
    );
};

export default ChatComponents;
