// app/api/hired-data/route.ts

import prisma from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // Avoid using dynamic properties that can't be statically analyzed
    const url = new URL(request.url);
    const jobId = url.searchParams.get('jobId'); // Example of safe usage

    // Your logic here
    if (!jobId) {        return NextResponse.json({ message: 'Missing jobId' }, { status: 400 });
    }

    const hiredRecords = await prisma.hired.findMany({
        where: { jobId },
        include: {
            client: true,
            freelancer: true,
        },
    });

    if (hiredRecords.length === 0) {
        return NextResponse.json({ message: 'Hired record not found' }, { status: 404 });
    }

    const hired = hiredRecords[0];

    return NextResponse.json({
        clientId: hired.clientId,
        clientFirstName: hired.clientFirstName,
        freelancerId: hired.freelancerId,
        freelancerFirstName: hired.freelancerFirstName,
    });
}
