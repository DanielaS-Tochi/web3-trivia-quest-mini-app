import { NextApiRequest, NextApiResponse } from 'next';
import { validateFrameRequest } from '@/lib/farcaster';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await validateFrameRequest(req);
    
    if (!user) {
      return res.status(401).json({ error: 'No valid Farcaster user found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error in Farcaster auth:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}