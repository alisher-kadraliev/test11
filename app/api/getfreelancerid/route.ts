import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET(request: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const freelancer = await prisma.freelancer.findUnique({
      where: { userId: user.id },
    });

    if (!freelancer) {
      return NextResponse.json({ error: 'Freelancer profile not found' }, { status: 404 });
    }

    return NextResponse.json({ freelancerId: freelancer.id });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
