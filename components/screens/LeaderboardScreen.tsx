import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { t } from '@/lib/translations';
import { PageLayout } from '@/components/layout/PageLayout';
import { Language, LeaderboardEntry as LeaderboardEntryType } from '@/types';

interface LeaderboardScreenProps {
  language: Language;
  leaderboard: LeaderboardEntryType[];
  loading?: boolean;
  onRefresh: () => void;
  onBackToHome: () => void;
}

export function LeaderboardScreen({ language, leaderboard, loading = false, onRefresh, onBackToHome }: LeaderboardScreenProps) {
  return (
    <PageLayout>
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-2xl">{t('leaderboard', language)}</CardTitle>
          <div className="flex gap-2">
            <Button onClick={onRefresh} size="sm">{loading ? t('loading', language) : t('refresh', language)}</Button>
            <Button onClick={onBackToHome} variant="outline" size="sm">{t('backToHome', language)}</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {leaderboard.length === 0 ? (
              <p className="text-gray-500">{t('noScores', language)}</p>
            ) : (
              leaderboard.map((e, idx) => (
                <div key={e.fid} className="flex items-center justify-between p-3 rounded-md bg-white/5">
                  <div>
                    <div className="font-medium">{idx + 1}. {e.username ?? e.fid}</div>
                    <div className="text-sm text-gray-400">FID: {e.fid}</div>
                  </div>
                  <div className="text-lg font-bold">{e.total_score}</div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
}