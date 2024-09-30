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

  if (req.method === 'PUT') {
    try {
      const { skills } = req.body;

      const updatedFreelancer = await prisma.freelancer.update({
        where: { id: String(id) },
        data: {
          skills,
        },
      });

      res.status(200).json(updatedFreelancer);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
