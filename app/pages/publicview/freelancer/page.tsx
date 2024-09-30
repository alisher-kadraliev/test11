// import React, { useState, useEffect } from 'react';
// import { supabase } from '@/app/lib/supabase';

// export default function ClientViewFreelancerProfile({ freelancerId }) {
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     async function fetchProfile() {
//       const response = await fetch(`/api/freelancer/${freelancerId}`);
//       const data = await response.json();
//       setProfile(data);
//     }
//     fetchProfile();
//   }, [freelancerId]);

//   if (!profile) return <p>Loading...</p>;

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <div className="flex flex-col md:flex-row items-center md:items-start">
//         <div className="md:w-1/3">
//           <div className="relative">
//             <img src={supabase.storage.from('profileimages').getPublicUrl(profile.profilePic).publicURL} alt="Profile" className="rounded-full w-32 h-32 object-cover" />
//           </div>
//         </div>
//         <div className="md:w-2/3 ml-4">
//           <h1 className="text-4xl font-bold">{profile.firstName} {profile.lastName}</h1>
//           <p>{profile.description}</p>
//           <button className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded">Hire Me</button>
//         </div>
//       </div>
//       <div className="mt-6 flex justify-between">
//         <div className="w-1/3">
//           <h2 className="text-2xl font-bold">Total Earnings</h2>
//           <p>${profile.totalEarnings.toFixed(2)}</p>
//         </div>
//         <div className="w-2/3">
//           <h2 className="text-2xl font-bold">Skills</h2>
//           <ul>
//             {profile.skills.map((skill, index) => <li key={index}>{skill}</li>)}
//           </ul>
//         </div>
//       </div>
//       <div className="mt-6">
//         <h2 className="text-2xl font-bold">Work History</h2>
//         <ul>
//           {profile.workHistory.map((job, index) => (
//             <li key={index}>
//               <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
//               <p>{job.description}</p>
//               <p>{new Date(job.startDate).toLocaleDateString()} - {job.endDate ? new Date(job.endDate).toLocaleDateString() : 'Present'}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

const PublicViewFreelancerPage = () => {
  return (
    <div>PublicViewFreelancerPage</div>
  )
}

export default PublicViewFreelancerPage