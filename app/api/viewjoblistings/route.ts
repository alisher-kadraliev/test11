// app/api/jobs/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db';

export async function GET() {
  try {
    const jobs = await prisma.jobPost.findMany({
      select: {
        id: true,
        title: true,
        shortDescription: true,
        price: true,
      },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Failed to retrieve job listings:', error);
    return NextResponse.json({ error: 'Failed to retrieve job listings' }, { status: 500 });
  }
}
