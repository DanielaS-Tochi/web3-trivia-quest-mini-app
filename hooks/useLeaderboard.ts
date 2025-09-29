import { useState } from 'react';
import { LeaderboardEntry } from '@/types';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const { profile } = useAuth();

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('player_scores')
        .select('fid, username, total_score')
        .order('total_score', { ascending: false })
        .limit(10);

      if (error) throw error;
      
      setLeaderboard(data.map(entry => ({
        fid: entry.fid,
        username: entry.username || `Player ${entry.fid}`,
        score: entry.total_score,
        isCurrentUser: profile?.fid === entry.fid
      })));
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveScore = async (score: number) => {
    if (!profile) {
      throw new Error('Usuario no autenticado');
    }

    try {
      const { error } = await supabase.rpc('update_player_score', {
        p_fid: profile.fid,
        p_username: profile.username,
        p_score: score
      });

      if (error) throw error;
      
      // Recargar el leaderboard después de guardar
      await loadLeaderboard();
    } catch (error) {
      console.error('Error saving score:', error);
      throw error;
    }
  };

  return {
    leaderboard,
    loading,
    loadLeaderboard,
    saveScore,
  };
}