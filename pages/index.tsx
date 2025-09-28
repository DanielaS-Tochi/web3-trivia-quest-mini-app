import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Question, getRandomQuestions, getQuestionById } from '@/lib/questions';
import { t } from '@/lib/translations';
import { generateSessionId } from '@/lib/utils';
import { GameSession, LeaderboardEntry, Language } from '@/types';
import { Trophy, Play, BookOpen, Globe } from 'lucide-react';
import Head from 'next/head';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const [screen, setScreen] = useState<'home' | 'game' | 'leaderboard' | 'instructions'>('home');
  const [gameSession, setGameSession] = useState<GameSession | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [fakeUser] = useState({ fid: '12345', username: 'demo_user' });

  useEffect(() => {
    // Set initial language based on browser preference
    const browserLang = navigator.language.startsWith('es') ? 'es' : 'en';
    setLanguage(browserLang);
  }, []);

  const startGame = () => {
    const questions = getRandomQuestions(5);
    const session: GameSession = {
      id: generateSessionId(),
      questions: questions.map(q => q.id),
      currentQuestionIndex: 0,
      score: 0,
      answers: {},
      completed: false,
      language,
    };
    setGameSession(session);
    setScreen('game');
  };

  const handleAnswer = (answerIndex: number) => {
    if (!gameSession || showFeedback) return;

    setCurrentAnswer(answerIndex);
    setShowFeedback(true);

    const currentQuestion = getQuestionById(gameSession.questions[gameSession.currentQuestionIndex]);
    if (!currentQuestion) return;

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const newSession = {
      ...gameSession,
      answers: { ...gameSession.answers, [currentQuestion.id]: answerIndex },
      score: isCorrect ? gameSession.score + 1 : gameSession.score,
    };

    setGameSession(newSession);

    setTimeout(() => {
      if (newSession.currentQuestionIndex + 1 >= newSession.questions.length) {
        // Game complete
        setGameSession({ ...newSession, completed: true });
      } else {
        // Next question
        setGameSession({
          ...newSession,
          currentQuestionIndex: newSession.currentQuestionIndex + 1,
        });
      }
      setShowFeedback(false);
      setCurrentAnswer(null);
    }, 2000);
  };

  const saveScore = async () => {
    if (!gameSession) return;

    setLoading(true);
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
        setGameSession(null);
      } else {
        throw new Error('Failed to save score');
      }
    } catch (error) {
      alert(t('errorSavingScore', language));
    } finally {
      setLoading(false);
    }
  };

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/leaderboard');
      const data = await response.json();
      setLeaderboard(data.leaderboard || []);
      setScreen('leaderboard');
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderHomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
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
                onClick={() => setLanguage('en')}
              >
                🇺🇸 EN
              </Button>
              <Button
                variant={language === 'es' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguage('es')}
              >
                🇪🇸 ES
              </Button>
            </div>
          </div>
          
          <Button onClick={startGame} className="w-full" size="lg">
            <Play className="w-5 h-5 mr-2" />
            {t('playTrivia', language)}
          </Button>
          
          <Button onClick={loadLeaderboard} variant="secondary" className="w-full" size="lg">
            <Trophy className="w-5 h-5 mr-2" />
            {t('viewLeaderboard', language)}
          </Button>
          
          <Button onClick={() => setScreen('instructions')} variant="outline" className="w-full" size="lg">
            <BookOpen className="w-5 h-5 mr-2" />
            {t('instructions', language)}
          </Button>
          
          <div className="text-center text-sm text-gray-500 mt-4">
            FID: {fakeUser.fid} | {fakeUser.username}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderGameScreen = () => {
    if (!gameSession) return null;

    const currentQuestion = getQuestionById(gameSession.questions[gameSession.currentQuestionIndex]);
    if (!currentQuestion) return null;

    if (gameSession.completed) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-2 text-green-600">
                {t('gameComplete', language)}
              </CardTitle>
              <p className="text-2xl font-bold">
                {t('yourScore', language)}: {gameSession.score}/{gameSession.questions.length}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={saveScore} disabled={loading} className="w-full" size="lg">
                {loading ? t('loading', language) : t('saveScore', language)}
              </Button>
              <Button onClick={startGame} variant="secondary" className="w-full" size="lg">
                {t('playAgain', language)}
              </Button>
              <Button onClick={() => { setScreen('home'); setGameSession(null); }} variant="outline" className="w-full" size="lg">
                {t('backToHome', language)}
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    const isCorrect = currentAnswer === currentQuestion.correctAnswer;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">
                {t('question', language)} {gameSession.currentQuestionIndex + 1} {t('of', language)} {gameSession.questions.length}
              </span>
              <span className="text-sm font-medium">
                {t('score', language)}: {gameSession.score}
              </span>
            </div>
            <CardTitle className="text-xl">
              {currentQuestion.question[language]}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentQuestion.options[language].map((option, index) => {
              let buttonVariant: 'default' | 'success' | 'danger' | 'outline' = 'outline';
              
              if (showFeedback && currentAnswer === index) {
                buttonVariant = isCorrect ? 'success' : 'danger';
              } else if (showFeedback && index === currentQuestion.correctAnswer) {
                buttonVariant = 'success';
              }
              
              return (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showFeedback}
                  variant={buttonVariant}
                  className="w-full justify-start text-left h-auto py-3 px-4"
                >
                  <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              );
            })}
            
            {showFeedback && (
              <div className="mt-4 p-4 rounded-lg bg-gray-50">
                <p className={`font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {isCorrect ? t('correct', language) : t('incorrect', language)}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {currentQuestion.explanation[language]}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderLeaderboardScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
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
            <Button onClick={loadLeaderboard} disabled={loading} className="flex-1">
              {t('refresh', language)}
            </Button>
            <Button onClick={() => setScreen('home')} variant="secondary" className="flex-1">
              {t('backToHome', language)}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderInstructionsScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {t('instructionsTitle', language)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <p>{t('rule1', language)}</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <p>{t('rule2', language)}</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <p>{t('rule3', language)}</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <p>{t('rule4', language)}</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
              <p>{t('rule5', language)}</p>
            </div>
          </div>
          
          <Button onClick={() => setScreen('home')} className="w-full mt-6" size="lg">
            {t('backToHome', language)}
          </Button>
        </CardContent>
      </Card>
    </div>
  );

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
      
      {screen === 'home' && renderHomeScreen()}
      {screen === 'game' && renderGameScreen()}
      {screen === 'leaderboard' && renderLeaderboardScreen()}
      {screen === 'instructions' && renderInstructionsScreen()}
    </>
  );
}