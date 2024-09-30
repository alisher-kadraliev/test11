// pages/api/user-dashboard.ts

import prisma from '@/app/lib/db'; // Import Prisma client
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function GET(req: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not authenticated' }), { status: 401 });
    }

    // Fetch user role from the database
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        freelancer: true,
        client: true,
      },
    });

    if (dbUser) {
      let dashboardUrl = '/pages/dashboard';

      if (dbUser.roleName === 'FREELANCER' && dbUser.freelancer) {
        dashboardUrl = `/pages/freelancer/${dbUser.freelancer.id}/profile`;
      } else if (dbUser.roleName === 'CLIENT' && dbUser.client) {
        dashboardUrl = `/pages/client/${dbUser.client.id}/profile`;
      }

      return new Response(JSON.stringify({ dashboardUrl }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}

// Remove the default export
