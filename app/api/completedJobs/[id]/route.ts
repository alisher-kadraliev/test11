// api/completedJobs/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const completedJob = await prisma.completedJob.findUnique({
    where: { id },
    include: {
      job: true,
      freelancer: true,
      client: true, // Include client details
    },
  });

  if (!completedJob) {
    return NextResponse.json({ message: 'Completed job not found' }, { status: 404 });
  }

  return NextResponse.json(completedJob);
}
