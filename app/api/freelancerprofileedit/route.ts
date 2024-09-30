
import prisma from '@/app/lib/db';
import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, province, address, postalCode, paymentMethod, bankName, idNumber, accountNumber, paypalUsername } = await request.json();

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const updatedFreelancer = await prisma.freelancer.update({
      where: { userId: user.id },
      data: {
        user: {
          update: {
            firstName,
            lastName,
            email,
          },
        },
        province,
        address,
        postalCode,
        paymentMethod,
        bankName,
        idNumber,
        accountNumber,
        paypalUsername,
      },
    });

    console.log(`Freelancer ${updatedFreelancer.userId} profile updated`);

    // Redirect to the freelancer dashboard
    const redirectUrl = `${new URL(request.url).origin}/pages/dashboard/freelancer`;

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in profile edit POST route:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Unexpected error in profile edit POST route:', error);
      return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
  }
}
