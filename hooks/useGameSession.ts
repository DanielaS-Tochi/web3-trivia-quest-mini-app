import { useState } from 'react';
import { GameSession, Language } from '@/types';
import { getRandomQuestions, getQuestionById } from '@/lib/questions';
import { generateSessionId } from '@/lib/utils';

export function useGameSession(language: Language) {
  const [gameSession, setGameSession] = useState<GameSession | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const resetGame = () => {
    setGameSession(null);
    setCurrentAnswer(null);
    setShowFeedback(false);
  };

  return {
    gameSession,
    currentAnswer,
    showFeedback,
    loading,
    setLoading,
    startGame,
    handleAnswer,
    resetGame,
  };
}