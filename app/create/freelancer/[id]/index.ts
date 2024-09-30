import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  if (req.method === 'GET') {
    try {
      const freelancer = await prisma.freelancer.findUnique({
        where: { id: String(id) },
        include: {
          workHistory: true,
        },
      });

      if (!freelancer) {
        return res.status(404).json({ error: 'Freelancer not found' });
      }

      res.status(200).json(freelancer);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
