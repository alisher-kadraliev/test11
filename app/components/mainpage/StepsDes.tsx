import React from 'react'
import { FaSignOutAlt } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { GiCardPick } from "react-icons/gi";

export const StepsDes = () => {
    return (
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid max-w-2xl mx-auto">
          <div className="flex">
            <div className="flex flex-col items-center mr-6">
              <div className="w-px h-10 opacity-0 sm:h-full" />
              <div>
                <div className="flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full bg-yellow-500">
                  1
                </div>
              </div>
              <div className="w-px h-full bg-gray-300" />
            </div>
            <div className="flex flex-col pb-6 sm:items-center sm:flex-row sm:pb-0">
              <div className="sm:mr-5">
                <div className="flex items-center justify-center w-16 h-16 my-3 rounded-full bg-yellow-500 sm:w-24 sm:h-24">
                  <FaSignOutAlt className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16" />
                </div>
              </div>
              <div>
                <p className="text-xl font-semibold sm:text-base text-black">
                  SignUp
                </p>
                <p className="text-sm text-gray-700">
                Quickly and easily set up your free account to access
                our pool of talented freelancers.
                </p>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col items-center mr-6">
              <div className="w-px h-10 bg-gray-300 sm:h-full" />
              <div>
                <div className="flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full bg-yellow-500">
                  2
                </div>
              </div>
              <div className="w-px h-full bg-gray-300" />
            </div>
            <div className="flex flex-col pb-6 sm:items-center sm:flex-row sm:pb-0">
            <div className="sm:mr-5">
                <div className="flex items-center justify-center w-16 h-16 my-3 rounded-full bg-yellow-500 sm:w-24 sm:h-24">
                  <MdOutlineWork className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16" />
                </div>
              </div>
              <div>
                <p className="text-xl font-semibold sm:text-base text-black">Post your Job</p>
                <p className="text-sm text-gray-700">
                Write a clear and detailed job description, then let our platform match you with
                top-rated freelancers who possess the skills and experience you need.
                </p>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col items-center mr-6">
              <div className="w-px h-10 bg-gray-300 sm:h-full" />
              <div>
                <div className="flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full bg-yellow-500">
                  3
                </div>
              </div>
              <div className="w-px h-full opacity-0" />
            </div>
            <div className="flex flex-col pb-6 sm:items-center sm:flex-row sm:pb-0">
            <div className="sm:mr-5">
                <div className="flex items-center justify-center w-16 h-16 my-3 rounded-full bg-yellow-500 sm:w-24 sm:h-24">
                  <GiCardPick className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16" />
                </div>
              </div>
              <div>
                <p className="text-xl font-semibold sm:text-base text-black">Hire Your Top Picks</p>
                <p className="text-sm text-gray-700">
                Review proposals, interview shortlisted candidates, and seamlessly onboard
                your chosen freelancer. all within our user-friendly platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default StepsDes