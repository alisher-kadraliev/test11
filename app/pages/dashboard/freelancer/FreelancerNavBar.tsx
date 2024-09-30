import Image from "next/image";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import DesktopLogo from "/public/mainimages/logo.png";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-gray-100">
      <div className="container mx-auto px-5 lg:px-10 py-1 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-5">
          <Image
            src={DesktopLogo}
            alt="Desktop Logo"
            className="w-32"
          />
        </Link>
        
        <div className="flex items-center space-x-5">
          <Link href="/mypages/chats">
            <IoChatboxEllipsesOutline size={24} className="text-gray-800 hover:text-gray-600 transition-colors duration-200 cursor-pointer" />
          </Link>
          <Link href="./freelancer/editprofile">
            <IoSettingsOutline size={24} className="text-gray-800 hover:text-gray-600 transition-colors duration-200 cursor-pointer" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
