import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';

export async function GET(req: NextRequest, { params }: { params: { jobId: string } }) {
  try {
    const { jobId } = params;

    const job = await prisma.jobPost.findUnique({
      where: { id: jobId },
      include: { client: true },
    });

    if (!job) {
      return NextResponse.json({ message: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json(job.client);
  } catch (error) {
    console.error('Error in /api/chatredirection/client:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
