import React from 'react';
import PublicView from './PublicView';
import OwnerView from './OwnerView';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '@/app/lib/db';

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return <div>You are not authenticated</div>;
  }

  // Check if the user is the owner of the profile
  const freelancer = await prisma.freelancer.findUnique({
    where: { userId: user.id },
  });

  if (freelancer && freelancer.id === params.id) {
    return <OwnerView freelancerId={params.id} />;
  } else {
    return <PublicView freelancerId={params.id} />;
  }
};

export default ProfilePage;
