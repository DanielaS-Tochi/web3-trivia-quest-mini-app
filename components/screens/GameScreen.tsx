import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Question } from '@/lib/questions';
import { GameSession, Language } from '@/types';
import { t } from '@/lib/translations';
import { PageLayout } from '@/components/layout/PageLayout';

interface GameScreenProps {
  gameSession: GameSession;
  currentQuestion: Question;
  language: Language;
  showFeedback: boolean;
  currentAnswer: number | null;
  loading?: boolean;
  onAnswer: (answerIndex: number) => void;
  onSaveScore: () => void;
  onPlayAgain: () => void;
  onBackToHome: () => void;
}

export function GameScreen({
  gameSession,
  currentQuestion,
  language,
  showFeedback,
  currentAnswer,
  loading = false,
  onAnswer,
  onSaveScore,
  onPlayAgain,
  onBackToHome,
}: GameScreenProps) {
  if (gameSession.completed) {
    return (
      <PageLayout>
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
            <Button onClick={onSaveScore} disabled={loading} className="w-full" size="lg">
              {loading ? t('loading', language) : t('saveScore', language)}
            </Button>
            <Button onClick={onPlayAgain} variant="secondary" className="w-full" size="lg">
              {t('playAgain', language)}
            </Button>
            <Button onClick={onBackToHome} variant="outline" className="w-full" size="lg">
              {t('backToHome', language)}
            </Button>
          </CardContent>
        </Card>
      </PageLayout>
    );
  }

  const isCorrect = currentAnswer === currentQuestion.correctAnswer;
  
  return (
    <PageLayout>
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
                onClick={() => onAnswer(index)}
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
}