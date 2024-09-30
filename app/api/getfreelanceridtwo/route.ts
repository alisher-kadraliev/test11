// app/api/getfreelancerid/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function GET(request: NextRequest) {
  try {
    // Get Kinde Auth session
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch freelancer by user ID
    const freelancer = await prisma.freelancer.findUnique({
      where: { userId: user.id },
    });

    if (!freelancer) {
      return NextResponse.json({ error: 'Freelancer not found' }, { status: 404 });
    }

    return NextResponse.json({ freelancerId: freelancer.id });
  } catch (error) {
    console.error('Failed to fetch freelancer ID:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch freelancer ID', 
      details: error instanceof Error ? error.message : 'An unexpected error occurred' 
    }, { status: 500 });
  }
}
