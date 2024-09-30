import React from 'react'
import { FaLinkedin, FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const FooterSection = () => {
    return (
        <footer className="bg-gray-100 mt-10">
            <div className="border-t border-gray-300"></div>
          <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h5 className="text-black text-lg font-bold mb-2">Categories</h5>
                <ul>
                  <li className="mb-1"><a href="#" className="text-gray-600 hover:text-gray-800">Creative & Visual Media</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-800">Content Creation</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-black text-lg font-bold mb-2">About</h5>
                <ul>
                  <li className="mb-1"><a href="#" className="text-gray-600 hover:text-gray-800">Updates</a></li>
                  <li className="mb-1"><a href="#" className="text-gray-600 hover:text-gray-800">Privacy Policy</a></li>
                  <li className="mb-1"><a href="#" className="text-gray-600 hover:text-gray-800">Terms of Service</a></li>
                  <li><a href="/Pro" className="text-gray-600 hover:text-gray-800">BaniWorks Pro</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-black text-lg font-bold mb-2">Support</h5>
                <ul>
                  <li className="mb-1"><a href="/support/helpandsupport" className="text-gray-600 hover:text-gray-800">Help and Support</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-800">Guides</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-black text-lg font-bold mb-2">Community</h5>
                <ul>
                  <li className="mb-1"><a href="#" className="text-gray-600 hover:text-gray-800">Blogs</a></li>
                  <li className="mb-1"><a href="#" className="text-gray-600 hover:text-gray-800">Content Creation</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-800">Community Standards</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-300 mt-5"></div>
            <div className="flex justify-between items-center mt-8">
              <div>
                <p className="text-gray-600 font-bold">&copy; 2024 BaniWorks</p>
              </div>
              <div className="flex space-x-4">
  <a href="#" className="text-gray-600 hover:text-gray-800"><FaLinkedin size={24} /></a>
  <a href="#" className="text-gray-600 hover:text-gray-800"><FaXTwitter size={24}/></a>
  <a href="#" className="text-gray-600 hover:text-gray-800"><FaFacebookF size={24}/></a>
  <a href="#" className="text-gray-600 hover:text-gray-800"><FaInstagram size={24}/></a>
  <a href="#" className="text-gray-600 hover:text-gray-800"><FaTiktok size={24}/></a>
</div>
            </div>
          </div>
        </footer>
      );
}

export default FooterSection