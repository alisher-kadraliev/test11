// /app/api/fleditpage.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/lib/db';

interface ErrorResponse {
  error: string;
}

export async function GET(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  const { userId } = await request.json();

  try {
    // Assume logic to fetch or create freelancer data
    const freelancerData = await prisma.freelancer.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!freelancerData) {
      // Create new freelancer data if not exists
      await prisma.freelancer.create({
        data: {
          userId: userId,
          // Include other fields as needed
        },
      });
    }

    // Redirect URL after creating/editing freelancer data
    const redirectUrl = `${window.location.origin}/app/fledit/${userId}/edit`;
    return new Response(JSON.stringify({ redirectUrl }), { status: 200 });
  } catch (error) {
    console.error('Error processing fledit:', error);
    return new Response(JSON.stringify({ error: 'Failed to process fledit' }), { status: 500 });
  }
}

export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  const { userId } = await request.json();

  try {
    // Assume logic to fetch or create freelancer data
    const freelancerData = await prisma.freelancer.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!freelancerData) {
      // Create new freelancer data if not exists
      await prisma.freelancer.create({
        data: {
          userId: userId,
          // Include other fields as needed
        },
      });
    }

    // Redirect URL after creating/editing freelancer data
    const redirectUrl = `${window.location.origin}/app/fledit/${userId}/edit`;
    return new Response(JSON.stringify({ redirectUrl }), { status: 200 });
  } catch (error) {
    console.error('Error processing fledit:', error);
    return new Response(JSON.stringify({ error: 'Failed to process fledit' }), { status: 500 });
  }
}
