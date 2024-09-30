import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';
import { supabase } from '@/app/lib/supabase';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function POST(request: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    console.log('User:', user);

    // Check if the user is a client
    let client = await prisma.client.findUnique({
      where: { userId: user.id },
    });

    if (!client) {
      // Create a new client record if it doesn't exist
      client = await prisma.client.create({
        data: {
          userId: user.id,
          firstName: 'DefaultFirstName', // Use default values or fetch additional details
          lastName: 'DefaultLastName',   // Use default values or fetch additional details
        },
      });
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const shortDescription = formData.get('shortDescription') as string;
    const fullDescription = formData.get('fullDescription') as string;
    const price = parseFloat(formData.get('price') as string);

    console.log('Form Data:', { title, shortDescription, fullDescription, price });

    // Validate length constraints
    if (title.length > 35) {
      return NextResponse.json({ error: 'Title exceeds 35 characters' }, { status: 400 });
    }
    if (shortDescription.length > 250) {
      return NextResponse.json({ error: 'Short description exceeds 250 characters' }, { status: 400 });
    }

    // Handle file uploads if any
    const files = formData.getAll('files') as File[];
    const fileUrls: string[] = [];

    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;
      const { data: imageData, error: imageError } = await supabase.storage
        .from('jobfiles')
        .upload(fileName, file, { cacheControl: '2592000', contentType: file.type });

      if (imageError) {
        console.error('File upload error:', imageError);
        throw new Error('Failed to upload file');
      }

      fileUrls.push(imageData?.path || '');
    }

    console.log('File URLs:', fileUrls);

    // Save job post in the database
    const jobPost = await prisma.jobPost.create({
      data: {
        title,
        shortDescription,
        fullDescription,
        price,
        clientId: client.id,
        fileUrls,
      },
    });

    console.log('Job Post Created:', jobPost);

    return NextResponse.json(jobPost);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating job post:', error.message);
      console.error('Stack trace:', error.stack);
      return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ error: 'Internal Server Error', details: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}
