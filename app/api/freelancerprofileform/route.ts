import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';
import { supabase } from '@/app/lib/supabase';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

interface FreelancerUpdateData {
  firstName?: string;
  lastName?: string;
  address?: string;
  province?: string;
  paymentMethod?: string;
  bankName?: string;
  accountNumber?: string;
  idNumber?: string;
  paypalUsername?: string;
  description?: string;
  profilePic?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const formData = await request.formData();
    const profilePic = formData.get('image') as File;
    const firstName = formData.get('fname') as string;
    const lastName = formData.get('lname') as string;
    const address = formData.get('address') as string;
    const province = formData.get('province') as string;
    const paymentMethod = formData.get('paymentMethod') as string;
    const bankName = formData.get('bankName') as string;
    const accountNumber = formData.get('accountNumber') as string;
    const idNumber = formData.get('idNumber') as string;
    const paypalUsername = formData.get('paypalUsername') as string;
    const description = formData.get('description') as string;

    let profilePicPath = '';

    if (profilePic) {
      const fileName = `${Date.now()}-${profilePic.name}`;
      const { data: imageData, error: imageError } = await supabase.storage
        .from('profileimages')
        .upload(fileName, profilePic, {
          cacheControl: '2592000',
          contentType: profilePic.type,
        });

      if (imageError) {
        console.error('Image upload error:', imageError);
        throw new Error('Failed to upload image');
      }

      profilePicPath = imageData?.path || '';
    }

    const updatedData: FreelancerUpdateData = {
      firstName,
      lastName,
      address,
      province,
      paymentMethod,
      bankName,
      accountNumber,
      idNumber,
      paypalUsername,
      description,
    };

    if (profilePicPath) {
      updatedData.profilePic = profilePicPath;
    }

    const freelancer = await prisma.freelancer.update({
      where: { userId: user.id },
      data: updatedData,
    });

    return NextResponse.json(freelancer);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error updating freelancer profile:', error.message);
      return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ error: 'Internal Server Error', details: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}
