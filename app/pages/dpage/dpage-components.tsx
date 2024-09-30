/* import { useCallback } from 'react';
import Talk from 'talkjs';
import { Session, Chatbox } from '@talkjs/react';

function DpageComponents() {
    const syncUser = useCallback(
        () =>
            new Talk.User({
                id: 'nina',
                name: 'Nina',
                email: 'nina@example.com',
                photoUrl: 'https://talkjs.com/new-web/avatar-7.jpg',
                welcomeMessage: 'Hi!',
            }),
        []
    );

    const syncConversation = useCallback((session: { getOrCreateConversation: (arg0: string) => any; me: any; }) => {
        // JavaScript SDK code here
        const conversation = session.getOrCreateConversation('new_conversation');

        const other = new Talk.User({
            id: 'frank',
            name: 'Frank',
            email: 'frank@example.com',
            photoUrl: 'https://talkjs.com/new-web/avatar-8.jpg',
            welcomeMessage: 'Hey, how can I help?',
        });
        conversation.setParticipant(session.me);
        conversation.setParticipant(other);

        return conversation;
    }, []);

    return (
        <Session appId="tEnIkiMW" syncUser={syncUser}>
            <Chatbox
                syncConversation={syncConversation}
                style={{ width: '100%', height: '500px' }}
            ></Chatbox>
        </Session>
    );
}

export default DpageComponents; */

import React from 'react'

const DpageComponents = () => {
  return (
    <div>DpageComponents</div>
  )
}

export default DpageComponents

// const me = new Talk.User("sample_user_alice");
// const session = new Talk.Session({
//         appId: '<APP_ID>',
//         me: me,
//       });

// const other = new Talk.User("sample_user_sebastian");

// const conversation = session.getOrCreateConversation(
//   Talk.oneOnOneId(me, other)
// );
// conversation.setParticipant(me);
// conversation.setParticipant(other);
// const inbox = session.createInbox();
// inbox.select(conversation);
// inbox.mount(document.getElementById("talkjs-container"));