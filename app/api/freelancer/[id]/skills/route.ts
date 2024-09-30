import { NextRequest } from 'next/server'; // Import NextRequest
import prisma from '@/app/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function PUT(req: NextRequest) { // Change type to NextRequest
  const id = req.nextUrl.searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing freelancer ID' }), { status: 400 });
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return new Response(JSON.stringify({ error: 'User not authenticated' }), { status: 401 });
  }

  try {
    const { skills } = await req.json();

    const updatedFreelancer = await prisma.freelancer.update({
      where: { id: String(id) },
      data: {
        skills,
      },
    });

    return new Response(JSON.stringify(updatedFreelancer), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
