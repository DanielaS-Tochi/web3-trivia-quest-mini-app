import { useState } from 'react';
import { LeaderboardEntry } from '@/types';

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/leaderboard');
      const data = await response.json();
      setLeaderboard(data.leaderboard || []);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    leaderboard,
    loading,
    loadLeaderboard,
  };
}