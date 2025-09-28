import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Play, Trophy, BookOpen } from 'lucide-react';
import { t } from '@/lib/translations';
import { Language } from '@/types';
import { PageLayout } from '@/components/layout/PageLayout';

interface HomeScreenProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onStartGame: () => void;
  onViewLeaderboard: () => void;
  onViewInstructions: () => void;
  fakeUser: { fid: string; username: string };
}

export function HomeScreen({
  language,
  onLanguageChange,
  onStartGame,
  onViewLeaderboard,
  onViewInstructions,
  fakeUser,
}: HomeScreenProps) {
  return (
    <PageLayout>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {t('welcome', language)}
          </CardTitle>
          <p className="text-gray-600 text-lg">{t('subtitle', language)}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium text-gray-700">{t('selectLanguage', language)}:</label>
            <div className="flex gap-2">
              <Button
                variant={language === 'en' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onLanguageChange('en')}
              >
                🇺🇸 EN
              </Button>
              <Button
                variant={language === 'es' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onLanguageChange('es')}
              >
                🇪🇸 ES
              </Button>
            </div>
          </div>
          
          <Button onClick={onStartGame} className="w-full" size="lg">
            <Play className="w-5 h-5 mr-2" />
            {t('playTrivia', language)}
          </Button>
          
          <Button onClick={onViewLeaderboard} variant="secondary" className="w-full" size="lg">
            <Trophy className="w-5 h-5 mr-2" />
            {t('viewLeaderboard', language)}
          </Button>
          
          <Button onClick={onViewInstructions} variant="outline" className="w-full" size="lg">
            <BookOpen className="w-5 h-5 mr-2" />
            {t('instructions', language)}
          </Button>
          
          <div className="text-center text-sm text-gray-500 mt-4">
            FID: {fakeUser.fid} | {fakeUser.username}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
}