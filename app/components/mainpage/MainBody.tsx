'use client'

import { useState } from 'react';
import Link from 'next/link';
import React from 'react';
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from 'next/image';

const MainBody: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div>
      {/* Navigation Links */}
      <div className="bg-white py-2 border-b border-gray-200">
        <div className="container mx-auto px-6 flex items-center justify-between overflow-x-auto whitespace-nowrap max-w-2xl relative">
          <Link href="pages/jobs/view" className="text-black px-2 lg:px-4 py-2 hover:text-yellow-500 transition">
            Jobs
          </Link>
          <Link href="pages/projects" className="text-black px-2 lg:px-4 py-2 hover:text-yellow-500 transition">
            Projects
          </Link>
          <Link href="pages/blogs" className="text-black px-2 lg:px-4 py-2 hover:text-yellow-500 transition">
            Blogs
          </Link>
          <Link href="pages/aboutus" className="text-black px-2 lg:px-4 py-2 hover:text-yellow-500 transition">
            About Us
          </Link>
        </div>
      </div>

      <div className='m-5'></div>
      <div className="block lg:hidden mt-8">
        <Image src="/mainimages/logo.png" alt="Logo" className="w-full max-w-xs mx-auto" width={100} height={100} />
      </div>
      <div className="relative z-10 flex flex-col lg:flex-row items-center bg-white mx-auto place-items-center">
        <div className="container flex flex-col lg:flex-row items-center lg:items-start px-6 py-16 mx-auto">
          <div className="relative z-20 flex flex-col text-center lg:text-left lg:w-2/5 lg:pr-8">
            <span className="w-20 h-2 mb-12 bg-gray-800 dark:bg-white mx-auto lg:mx-0"></span>
            <h1 className="text-6xl font-black leading-none uppercase font-bebas-neue sm:text-8xl dark:text-black text-black">
              Skip the Search
              <span className="text-5xl sm:text-6xl block">Find the Best</span>
            </h1>
            <p className="text-sm text-gray-700 sm:text-base dark:text-zink-600">
              BaniWorks connects you with Sri Lanka&apos;s top freelance talent, guaranteeing a seamless experience and maximizing your chances of project success.
            </p>
            <div className="flex flex-col items-center lg:items-start mt-8">
              {/* Hide on mobile, show on larger screens */}
              <div className="hidden sm:flex">
                <div className="px-4 py-2 mr-4 text-white uppercase bg-yellow-500 border-2 border-transparent rounded-full text-md hover:bg-yellow-600">
                  <RegisterLink>Find Talent</RegisterLink>
                </div>
                <div className="px-4 py-2 mr-4 text-white uppercase bg-yellow-500 border-2 border-transparent rounded-full text-md hover:bg-yellow-600">
                  <RegisterLink>Find Work</RegisterLink>
                </div>
              </div>
              {/* Show on mobile */}
              <div className="px-4 py-2 text-white uppercase bg-yellow-500 border-2 border-transparent rounded-full text-md hover:bg-yellow-600 sm:hidden">
                <RegisterLink>Register Now</RegisterLink>
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block lg:w-3/5 mt-5">
            <Image src="/mainimages/img1.png" alt="Image" className="w-3/4 max-w-md mx-auto" width={100} height={100} />
          </div>
        </div>
      </div>

      {/* Mobile image */}
      
    </div>
  );
};

export default MainBody;
