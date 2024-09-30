import Image from "next/image";
import Link from "next/link";
import DesktopLogo from "/public/mainimages/logo.png";
import MobileLogo from "/public/mainimages/logo.png";
import { UserNav }  from "./UserNav";
import SearchBar from "./mainpage/SearchBar";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-gray-100"> 
      <div className="container mx-auto px-5 lg:px-10 py-1 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-5">
          <Image
            src={DesktopLogo}
            alt="Desktop Logo"
            className="w-32 hidden lg:block"
          />
        </Link>

        <div className="hidden lg:flex flex-1 items-center justify-center lg:justify-end">
          <SearchBar />
        </div>
        
        <div className="hidden lg:flex items-center space-x-5">
          <UserNav />
        </div>
      </div>
      
      <div className="flex lg:hidden items-center justify-between container mx-auto px-5 py-1">
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <SearchBar />
          <UserNav />
        </div>
      </div>
    </nav>
  );
}
