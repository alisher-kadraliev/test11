import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db'; // Adjust the import based on your project structure

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const jobId = params.id;

  if (!jobId) {
    return NextResponse.json({ error: 'Invalid job ID' }, { status: 400 });
  }

  try {
    // Fetch job details including the title
    const job = await prisma.jobPost.findUnique({
      where: { id: jobId },
      select: { title: true }, // Fetch only the job title
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Fetch proposals along with freelancer details
    const proposals = await prisma.proposal.findMany({
      where: { jobId },
      include: {
        freelancer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    // Combine firstName and lastName to create a full name
    const proposalsWithFullName = proposals.map(proposal => ({
      ...proposal,
      freelancer: {
        ...proposal.freelancer,
        name: `${proposal.freelancer.firstName} ${proposal.freelancer.lastName}`,
      },
    }));

    return NextResponse.json({ jobTitle: job.title, proposals: proposalsWithFullName });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
