// components/Navbar.tsx

import Link from 'next/link';
import Image from 'next/image';
import DesktopLogo from '/public/mainimages/logo.png'
import { GrChatOption } from "react-icons/gr";

const ClientNavbar: React.FC = () => {
  return (
    <nav className="bg-gray-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo (left side) */}
        <Link href="/" className="flex items-center space-x-5">
          <Image
            src={DesktopLogo}
            alt="Desktop Logo"
            className="w-32 lg:block"
          />
        </Link>

        {/* Chat icon (right side) */}
        <div className="text-black text-lg cursor-pointer">
          <Link href='/pages/clientchat'>
        <GrChatOption />
        </Link>
        </div>
      </div>
    </nav>
  );
};

export default ClientNavbar;
