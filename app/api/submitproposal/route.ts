// app/api/submitproposal/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const proposal = formData.get('proposal') as string;
    const jobId = formData.get('jobId') as string;
    const freelancerId = formData.get('freelancerId') as string;
    const files = formData.getAll('files') as File[];

    console.log('Form Data:', { proposal, jobId, freelancerId, files }); // Log form data

    // Mock file upload logic for now
    const fileUrls = await Promise.all(files.map(async (file) => {
      // Implement your file upload logic here
      return 'uploaded-file-url'; // Replace with actual URL after upload
    }));

    console.log('File URLs:', fileUrls); // Log file URLs

    await prisma.proposal.create({
      data: {
        proposal,
        jobId,
        freelancerId,
        fileUrls,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to submit proposal:', error);

    if (error instanceof Error) {
      console.error('Error details:', error.message); // Log detailed error message
      return NextResponse.json({ error: 'Failed to submit proposal', details: error.message }, { status: 500 });
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ error: 'Failed to submit proposal', details: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}
