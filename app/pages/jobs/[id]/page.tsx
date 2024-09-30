// app/pages/jobs/[id]/page.tsx

import { redirect } from 'next/navigation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '@/app/lib/db';

interface JobPost {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  fileUrls: string[];
}

const JobViewPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  
  // Fetch job details from database
  const jobPost = await prisma.jobPost.findUnique({
    where: { id },
  });

  if (!jobPost) {
    return <p>Job not found</p>;
  }

  // Get user session (optional: if needed for specific actions)
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">{jobPost.title}</h1>
        <p className="text-lg mb-4">{jobPost.fullDescription}</p>
        <div className="flex flex-wrap gap-4">
          {jobPost.fileUrls.map((url, index) => (
            <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              File {index + 1}
            </a>
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          <span className="font-bold text-lg">Price: ${jobPost.price}</span>
          {user ? (
            <button 
              onClick={() => redirect(`pages/jobs/apply/${jobPost.id}`)} 
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              Apply Now
            </button>
          ) : (
            <p className="text-red-500">Please log in to apply for this job.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobViewPage;
