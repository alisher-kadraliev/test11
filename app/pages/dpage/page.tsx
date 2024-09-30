import { Suspense } from "react";
import DpageComponents from "./dpage-components";

function Chat() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DpageComponents />
    </Suspense>
  );
}

export default Chat;


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