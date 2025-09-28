import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LeaderboardEntry, Language } from '@/types';
import { t } from '@/lib/translations';
import { PageLayout } from '@/components/layout/PageLayout';

interface LeaderboardScreenProps {
  language: Language;
  loading: boolean;
  leaderboard: LeaderboardEntry[];
  onRefresh: () => void;
  onBackToHome: () => void;
}

export function LeaderboardScreen({
  language,
  loading,
  leaderboard,
  onRefresh,
  onBackToHome,
}: LeaderboardScreenProps) {
  return (
    <PageLayout>
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {t('leaderboard', language)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">{t('loading', language)}</div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No players yet</div>
          ) : (
            <div className="space-y-3">
              {leaderboard.map((player, index) => (
                <div key={player.fid} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium">{player.username}</p>
                      <p className="text-xs text-gray-500">
                        {t('sessionsToday', language)}: {player.sessions_today}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{player.total_score}</p>
                    <p className="text-xs text-gray-500">{t('totalScore', language)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex gap-2 mt-6">
            <Button onClick={onRefresh} disabled={loading} className="flex-1">
              {t('refresh', language)}
            </Button>
            <Button onClick={onBackToHome} variant="secondary" className="flex-1">
              {t('backToHome', language)}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}