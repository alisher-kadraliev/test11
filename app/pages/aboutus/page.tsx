'use client'

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const AboutUs = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/mainimages/hero.jpg" // Replace with your hero image
            alt="Hero Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="opacity-50"
          />
        </div>
        <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to BaniWorks
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Bridging the Gap Between Freelancers and Clients
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-400 transition"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* About Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Our Story
          </h2>
          <p className="text-lg mb-6">
            We are a dynamic team of undergraduates from the Faculty of Computing, Department of Software Engineering at Sabaragamuwa University of Sri Lanka. Driven by our passion for technology and innovation, we embarked on a mission to bridge the gap between freelancers and clients, creating a space where trust and opportunity flourish.
          </p>
          <p className="text-lg mb-6">
            In the rapidly evolving world of freelancing, we saw a pressing need for a platform that not only connects freelancers with clients but also fosters a reliable and secure environment for collaboration. With a deep understanding of both the challenges and potential within the freelance industry, we set out to build a solution that addresses these needs head-on.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Our Vision
          </h2>
          <p className="text-lg mb-6">
            Our vision is to create a platform that stands out for its commitment to trustworthiness, user-friendly design, and unmatched support. We believe in empowering freelancers by providing them with the tools and opportunities to showcase their talents while offering clients a seamless experience to find and hire the best professionals for their projects.
          </p>
          <div className="flex justify-center gap-4">
            
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Our Commitment
          </h2>
          <p className="text-lg mb-6">
            We are committed to not only advancing the freelance industry but also to growing as individuals and professionals. Our journey is fueled by the desire to make a meaningful impact and to continually enhance our platform based on feedback and evolving industry trends.
          </p>
          <p className="text-lg mb-6">
            As we continue to grow and evolve, we invite you to join us on this exciting journey. Whether you&apos;re a freelancer seeking new opportunities or a client looking for top talent, BaniWorks is here to help you achieve your goals.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-yellow-600 text-white py-6">
        <div className="text-center">
          <p className="text-lg mb-4">
            Thank you for visiting our platform and for supporting our mission. Together, we can create a trusted and vibrant community where freelancers and clients thrive.
          </p>
          
          
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
