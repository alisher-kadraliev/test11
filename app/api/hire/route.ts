// src/app/api/paymentdetails/job/[jobId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';

export async function GET(request: NextRequest, { params }: { params: { jobId: string } }) {
  if (!params || !params.jobId) {
    return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
  }

  try {
    const job = await prisma.jobPost.findUnique({
      where: { id: params.jobId },
      select: {
        id: true,
        title: true,
        shortDescription: true,
        fullDescription: true,
        price: true,
        fileUrls: true,
        categoryName: true,
      },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error('Failed to retrieve job details:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: 'Failed to retrieve job details', details: errorMessage }, { status: 500 });
  }
}
