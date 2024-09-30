import { Suspense } from 'react'; // Import Suspense
import ChatComponents from './page';

const Chat = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <ChatComponents /> */}
    </Suspense>
  );
};

export default Chat;

