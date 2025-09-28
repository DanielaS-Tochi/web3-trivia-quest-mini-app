import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data: players, error } = await supabaseAdmin
      .from('player_scores')
      .select('fid, username, total_score, sessions_today')
      .order('total_score', { ascending: false })
      .limit(10);

    if (error) {
      throw error;
    }

    const leaderboard = players.map((player, index) => ({
      rank: index + 1,
      fid: player.fid,
      username: player.username || `User${player.fid}`,
      total_score: player.total_score,
      sessions_today: player.sessions_today,
    }));

    res.status(200).json({ leaderboard });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}