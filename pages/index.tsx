import { useState } from 'react';
import { getQuestionById } from '@/lib/questions';
import { t } from '@/lib/translations';
import Head from 'next/head';
import { HomeScreen } from '@/components/screens/HomeScreen';
import { GameScreen } from '@/components/screens/GameScreen';
import { LeaderboardScreen } from '@/components/screens/LeaderboardScreen';
import { InstructionsScreen } from '@/components/screens/InstructionsScreen';
import { useLanguage } from '@/hooks/useLanguage';
import { useGameSession } from '@/hooks/useGameSession';
import { useLeaderboard } from '@/hooks/useLeaderboard';

export default function Home() {
  const [screen, setScreen] = useState<'home' | 'game' | 'leaderboard' | 'instructions'>('home');
  const { language, setLanguage } = useLanguage();
  const {
    gameSession,
    currentAnswer,
    showFeedback,
    loading: gameLoading,
    setLoading: setGameLoading,
    startGame,
    handleAnswer,
    resetGame,
  } = useGameSession(language);
  const { leaderboard, loading: leaderboardLoading, loadLeaderboard } = useLeaderboard();
  // Usuario demo temporal con ID único para desarrollo
  const [fakeUser] = useState({ 
    fid: `demo_${Date.now()}`, 
    username: `Demo User ${new Date().toLocaleTimeString()}`
  });

  const saveScore = async () => {
    if (!gameSession) return;

    setGameLoading(true);
    try {
      const response = await fetch(`/api/players/${fakeUser.fid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: fakeUser.username,
          sessionScore: gameSession.score,
        }),
      });

      if (response.ok) {
        alert(t('scoreSaved', language));
        setScreen('home');
        resetGame();
      } else {
        throw new Error('Failed to save score');
      }
    } catch (_error) {
      console.error('Save score error:', _error);
      alert(t('errorSavingScore', language));
    } finally {
      setGameLoading(false);
    }
  };

  const handleViewLeaderboard = () => {
    loadLeaderboard();
    setScreen('leaderboard');
  };

  const handleBackToHome = () => {
    setScreen('home');
    resetGame();
  };

  return (
    <>
      <Head>
        <title>Web3 Trivia Quest</title>
        <meta name="description" content="Learn Web3 while you compete in trivia challenges" />
        <meta property="og:title" content="Web3 Trivia Quest" />
        <meta property="og:description" content="Interactive Web3 trivia game for Farcaster" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content={`${process.env.NEXT_PUBLIC_APP_URL}/api/og`} />
        <meta property="fc:frame:button:1" content="Play Trivia" />
        <meta property="fc:frame:button:2" content="Leaderboard" />
        <meta property="fc:frame:button:3" content="Instructions" />
        <meta property="fc:frame:post_url" content={`${process.env.NEXT_PUBLIC_APP_URL}/api/frame`} />
      </Head>
      
      {screen === 'home' && (
        <HomeScreen
          language={language}
          onLanguageChange={setLanguage}
          onStartGame={() => { startGame(); setScreen('game'); }}
          onViewLeaderboard={handleViewLeaderboard}
          onViewInstructions={() => setScreen('instructions')}
          fakeUser={fakeUser}
        />
      )}
      {screen === 'game' && gameSession && (() => {
        const q = getQuestionById(gameSession.questions[gameSession.currentQuestionIndex]);
        if (!q) return null;
        return (
          <GameScreen
            gameSession={gameSession}
            currentQuestion={q}
          language={language}
          showFeedback={showFeedback}
          currentAnswer={currentAnswer}
          loading={gameLoading}
          onAnswer={handleAnswer}
          onSaveScore={saveScore}
          onPlayAgain={() => { startGame(); setScreen('game'); }}
          onBackToHome={handleBackToHome}
          />
        );
      })()}
      {screen === 'leaderboard' && (
        <LeaderboardScreen
          language={language}
          loading={leaderboardLoading}
          leaderboard={leaderboard}
          onRefresh={loadLeaderboard}
          onBackToHome={() => setScreen('home')}
        />
      )}
      {screen === 'instructions' && (
        <InstructionsScreen
          language={language}
          onBackToHome={() => setScreen('home')}
        />
      )}
    </>
  );
}