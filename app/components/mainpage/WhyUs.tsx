import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { BsCheckCircleFill } from "react-icons/bs";

const WhyUs = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen mt-5 max-w-7xl mx-auto"> {/* Set height for full viewport */}
      
      <div className="w-full md:w-1/3 flex justify-center items-center mt-11 md:mt-0"> 
        <Image
          src="/mainimages/img2.png"
          alt="Baniworks Hero Image"
          width={300}  
          height={300}
          className="object-cover hidden md:block"
        />
      </div>
      
      <div className="w-full md:w-2/3 flex flex-col justify-center items-center px-4 font-mono-monaco ml-0 md:ml-11 "> 
        
        <h1 className="text-black text-4xl md:text-7xl font-mont-alt leading-tight text-left">
          <span>Why</span>
          <span className="text-yellow-500 text-5xl md:text-8xl font-medium ml-2 md:ml-5">Us?</span>
        </h1>

        {/* Next Text Block */}
        <div className="mt-3 text-left"> {/* Align text left */}
          
            <p className="text-zinc-600 font-medium text-xl md:text-3xl leading-tight flex items-start mt-3">
                <BsCheckCircleFill className="mr-2 text-yellow-500" />Level up your projects with Sri Lanka&apos;s finest freelance talent
            </p>
            <p className="text-zinc-600 font-medium text-xl md:text-3xl leading-tight flex items-start mt-3">
                <BsCheckCircleFill className="mr-2 text-yellow-500" />Work smarter, not harder. We simplify project collaboration.
            </p>
            <p className="text-zinc-600 font-medium text-xl md:text-3xl leading-tight flex items-start mt-3">
                <BsCheckCircleFill className="mr-2 text-yellow-500" />Unlock your freelance potential and build a thriving career. 
            </p>
            <p className="text-zinc-600 font-medium text-xl md:text-3xl leading-tight flex items-start mt-3">
                <BsCheckCircleFill className="mr-2 text-yellow-500" />Goodbye to endless searches. Find what you need on Us.
            </p>
            <p className="text-zinc-600 font-medium text-xl md:text-3xl leading-tight flex items-start mt-3">
                <BsCheckCircleFill className="mr-2 text-yellow-500" />Connect & Work. Anywhere. Join us with anywhere in Sri Lanka.
            </p>

        </div>
        
        <div className="flex items-center mt-9">
          <Link href="./aboutus" className="px-10 md:px-20 py-3 md:py-5 rounded-full bg-yellow-500 hover:bg-yellow-600 text-black text-lg md:text-2xl mr-5">
            Learn More About Us
          </Link>
        </div>

      </div>
      
    </div>
  );
};

export default WhyUs;
