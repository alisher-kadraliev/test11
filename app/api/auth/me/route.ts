// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function GET(request: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    return NextResponse.json({ id: user.id });
  } catch (error) {
    console.error('Error fetching user session:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
