import Link from 'next/link'
import React from 'react';
import StepsDes from './StepsDes';
import { BsCheckCircleFill } from "react-icons/bs";

const HireLikeaPro = () => {
return (
  <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-black text-6xl font-medium ml-7 mt-5">
          <span>Hire Like a</span>
          <span className="text-yellow-500 text-7xl font-medium ml-5">Pro</span>
          <span className="text-black text-6xl font-medium ml-5"></span>
      </h1>
      <StepsDes />
        <div className="mt-3 ml-2 md:ml-9 text-left"> {/* Align text left */}
          
          <p className="text-black text-lg md:text-3xl leading-tight flex items-start mt-3">
            <BsCheckCircleFill className="mr-2 text-yellow-500" />Find top Sri Lankan freelance talent on our platform.
          </p>
          <p className="text-black text-lg md:text-3xl leading-tight flex items-start mt-3">
            <BsCheckCircleFill className="mr-2 text-yellow-500" />Our secure platform ensuring a smooth project experience.
          </p>
          <p className="text-black text-lg md:text-3xl leading-tight flex items-start mt-3">
            <BsCheckCircleFill className="mr-2 text-yellow-500" />Our curated talent pool connects you with Sri Lanka&apos;s freelancers.
          </p>

        </div>     
                
  </div>
);
};

export default HireLikeaPro;
