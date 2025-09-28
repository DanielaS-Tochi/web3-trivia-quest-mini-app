import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { isToday } from '@/lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { fid } = req.query;

  if (!fid || typeof fid !== 'string') {
    return res.status(400).json({ error: 'FID is required' });
  }

  if (req.method === 'GET') {
    try {
      const { data: player, error } = await supabaseAdmin
        .from('player_scores')
        .select('*')
        .eq('fid', fid)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (!player) {
        return res.status(404).json({ error: 'Player not found' });
      }

      // Reset daily sessions if it's a new day
      if (!isToday(player.last_played)) {
        const { error: updateError } = await supabaseAdmin
          .from('player_scores')
          .update({ 
            sessions_today: 0,
            updated_at: new Date().toISOString()
          })
          .eq('fid', fid);

        if (updateError) {
          console.error('Error resetting daily sessions:', updateError);
        } else {
          player.sessions_today = 0;
        }
      }

      res.status(200).json({ player });
    } catch (error) {
      console.error('Error fetching player:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    const { username, sessionScore } = req.body;

    if (typeof sessionScore !== 'number') {
      return res.status(400).json({ error: 'Session score is required' });
    }

    try {
      // Get existing player or create new one
      let { data: player, error: fetchError } = await supabaseAdmin
        .from('player_scores')
        .select('*')
        .eq('fid', fid)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      const now = new Date().toISOString();
      
      if (!player) {
        // Create new player
        const { data: newPlayer, error: createError } = await supabaseAdmin
          .from('player_scores')
          .insert({
            fid,
            username: username || `User${fid}`,
            total_score: sessionScore,
            sessions_today: 1,
            last_played: now,
            created_at: now,
            updated_at: now,
          })
          .select()
          .single();

        if (createError) {
          throw createError;
        }

        return res.status(201).json({ player: newPlayer });
      } else {
        // Reset sessions if it's a new day
        let sessionsToday = player.sessions_today;
        if (!isToday(player.last_played)) {
          sessionsToday = 0;
        }

        // Check daily limit
        if (sessionsToday >= 5) {
          return res.status(429).json({ error: 'Daily session limit reached' });
        }

        // Update existing player
        const { data: updatedPlayer, error: updateError } = await supabaseAdmin
          .from('player_scores')
          .update({
            username: username || player.username,
            total_score: player.total_score + sessionScore,
            sessions_today: sessionsToday + 1,
            last_played: now,
            updated_at: now,
          })
          .eq('fid', fid)
          .select()
          .single();

        if (updateError) {
          throw updateError;
        }

        return res.status(200).json({ player: updatedPlayer });
      }
    } catch (error) {
      console.error('Error updating player:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}