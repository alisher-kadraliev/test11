import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';

export async function GET(req: NextRequest, { params }: { params: { freelancerId: string } }) {
  try {
    const { freelancerId } = params;

    const freelancer = await prisma.freelancer.findUnique({
      where: { id: freelancerId },
    });

    if (!freelancer) {
      return NextResponse.json({ message: 'Freelancer not found' }, { status: 404 });
    }

    return NextResponse.json(freelancer);
  } catch (error) {
    console.error('Error in /api/chatredirection/freelancer:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
