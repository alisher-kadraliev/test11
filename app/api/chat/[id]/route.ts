/* // pages/api/chat/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/lib/db'; // Updated import for Prisma
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid job ID' });
  }

  try {
    // Get Kinde server session
    const session = await getKindeServerSession(req, res);

    // Check for a valid session
    if (!session || !session.getIdToken()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Fetch hiring details using the jobId
    const hired = await prisma.hired.findUnique({
      where: { id: id },
      include: { client: true, freelancer: true }
    });

    if (!hired) {
      return res.status(404).json({ message: 'No hiring record found' });
    }

    res.status(200).json({
      client: {
        id: hired.clientId,
        firstName: hired.clientFirstName,
        lastName: hired.clientLastName
      },
      freelancer: {
        id: hired.freelancerId,
        firstName: hired.freelancerFirstName,
        lastName: hired.freelancerLastName
      }
    });
  } catch (error) {
    // Handle unknown errors
    const errorMessage = (error as Error).message || 'Internal Server Error';
    res.status(500).json({ message: errorMessage });
  }
}
 */
export async function GET() { // Ensure correct function signature
  }