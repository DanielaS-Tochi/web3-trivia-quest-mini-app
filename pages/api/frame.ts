import { NextApiRequest, NextApiResponse } from 'next';
import { validateFrameRequest, generateFrameImageUrl, createFrameMetadata, FarcasterUser } from '@/lib/farcaster';
import { getRandomQuestions, getQuestionById } from '@/lib/questions';
import { generateSessionId } from '@/lib/utils';

interface FrameState {
  screen: string;
  fid?: number | string;
  sessionId?: string;
  language?: 'en' | 'es';
  questions?: string[];
  currentQuestionIndex?: number;
  score?: number;
  answers?: Record<string, number>;
  finalScore?: number;
}

interface SessionState {
  sessionId: string;
  fid: number | string;
  language: 'en' | 'es';
  questions: string[];
  currentQuestionIndex: number;
  score: number;
  answers: Record<string, number>;
}

const sessions = new Map<string, SessionState>();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await validateFrameRequest(req);
    if (!user) {
      return res.status(400).json({ error: 'Invalid frame request' });
    }

  const { buttonIndex, state } = req.body.untrustedData || {};
  const currentState: FrameState | null = state ? JSON.parse(decodeURIComponent(state)) : null;

    // Handle different actions based on button pressed and current state
    if (!currentState) {
      // Initial frame - show home screen
      return handleHomeScreen(req, res, user, buttonIndex);
    }

    switch (currentState.screen) {
      case 'home':
        return handleHomeScreen(req, res, user, buttonIndex);
    case 'language':
      return handleLanguageSelection(req, res, user, buttonIndex, currentState);
      case 'game':
        return handleGameScreen(req, res, user, buttonIndex, currentState);
      case 'leaderboard':
        return handleLeaderboardScreen(req, res, user, buttonIndex, currentState);
      case 'instructions':
        return handleInstructionsScreen(req, res, user, buttonIndex, currentState);
      default:
        return handleHomeScreen(req, res, user, 1);
    }
  } catch (_error) {
    console.error('Frame handler error:', _error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleHomeScreen(req: NextApiRequest, res: NextApiResponse, user: FarcasterUser, buttonIndex?: number) {
  const state = { screen: 'home', fid: user.fid };
  const image = generateFrameImageUrl('Web3 Trivia Quest', 'Learn Web3 while you compete');
  
  if (buttonIndex === 1) {
    // Play Trivia - go to language selection
    const newState = { screen: 'language', fid: user.fid };
    const langImage = generateFrameImageUrl('Select Language', 'Choose your preferred language');
    const metadata = createFrameMetadata(
      langImage,
      ['English', 'Español', 'Back'],
      `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`
    );
    
    return res.status(200).json({
      ...metadata,
      state: encodeURIComponent(JSON.stringify(newState)),
    });
  } else if (buttonIndex === 2) {
    // View Leaderboard
    return handleLeaderboardScreen(req, res, user, 1, { screen: 'leaderboard', fid: user.fid });
  } else if (buttonIndex === 3) {
    // Instructions
    return handleInstructionsScreen(req, res, user, 1, { screen: 'instructions', fid: user.fid });
  }

  const metadata = createFrameMetadata(
    image,
    ['Play Trivia', 'Leaderboard', 'Instructions'],
    `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`
  );

  return res.status(200).json({
    ...metadata,
    state: encodeURIComponent(JSON.stringify(state)),
  });
}

async function handleLanguageSelection(req: NextApiRequest, res: NextApiResponse, user: FarcasterUser, buttonIndex: number, _currentState: FrameState | null) {
  if (buttonIndex === 3) {
    // Back button
    return handleHomeScreen(req, res, user);
  }

  const language = (buttonIndex === 1 ? 'en' : 'es') as 'en' | 'es';
  const questions = getRandomQuestions(5);
  const sessionId = generateSessionId();
  
  const gameState = {
    screen: 'game',
    fid: user.fid,
    sessionId,
    language,
    questions: questions.map(q => q.id),
    currentQuestionIndex: 0,
    score: 0,
    answers: {},
  };

  sessions.set(sessionId, gameState);

  const question = questions[0];
  const questionText = question.question[language];
  const options = question.options[language];
  
  const image = generateFrameImageUrl(
    `Question 1 of ${questions.length}`,
    questionText,
    0
  );
  
  const metadata = createFrameMetadata(
    image,
    options.slice(0, 4), // Ensure max 4 options
    `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`
  );

  return res.status(200).json({
    ...metadata,
    state: encodeURIComponent(JSON.stringify(gameState)),
  });
}

async function handleGameScreen(req: NextApiRequest, res: NextApiResponse, user: FarcasterUser, buttonIndex: number, currentState: FrameState | null) {
  if (!currentState || !currentState.sessionId) return handleHomeScreen(req, res, user);
  const session = sessions.get(currentState.sessionId);
  if (!session) {
    return handleHomeScreen(req, res, user);
  }

  const currentQuestion = getQuestionById(session.questions[session.currentQuestionIndex]);
  if (!currentQuestion) {
    return handleHomeScreen(req, res, user);
  }

  // Record answer
  const isCorrect = buttonIndex - 1 === currentQuestion.correctAnswer;
  session.answers[currentQuestion.id] = buttonIndex - 1;
  
  if (isCorrect) {
    session.score++;
  }

  session.currentQuestionIndex++;

  // Check if game is complete
  if (session.currentQuestionIndex >= session.questions.length) {
    // Game complete - show results
    const image = generateFrameImageUrl(
      session.language === 'en' ? 'Game Complete!' : '¡Juego Completado!',
      `${session.language === 'en' ? 'Your Score:' : 'Tu Puntuación:'} ${session.score}/${session.questions.length}`,
      session.score
    );
    
    const metadata = createFrameMetadata(
      image,
      [
        session.language === 'en' ? 'Save Score' : 'Guardar Puntuación',
        session.language === 'en' ? 'Play Again' : 'Jugar de Nuevo',
        session.language === 'en' ? 'Home' : 'Inicio'
      ],
      `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`
    );

    const finalState = {
      screen: 'gameComplete',
      fid: user.fid,
      sessionId: session.sessionId,
      language: session.language,
      finalScore: session.score,
    };

    return res.status(200).json({
      ...metadata,
      state: encodeURIComponent(JSON.stringify(finalState)),
    });
  }

  // Show next question
  const nextQuestion = getQuestionById(session.questions[session.currentQuestionIndex]);
  const questionText = nextQuestion.question[session.language];
  const options = nextQuestion.options[session.language];
  
  const image = generateFrameImageUrl(
    `Question ${session.currentQuestionIndex + 1} of ${session.questions.length}`,
    questionText,
    session.score
  );
  
  const metadata = createFrameMetadata(
    image,
    options.slice(0, 4),
    `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`
  );

  sessions.set(currentState.sessionId, session);

  return res.status(200).json({
    ...metadata,
    state: encodeURIComponent(JSON.stringify(session)),
  });
}

async function handleLeaderboardScreen(req: NextApiRequest, res: NextApiResponse, user: FarcasterUser, buttonIndex: number, currentState: FrameState | null) {
  if (buttonIndex === 2) {
    // Back to home
    return handleHomeScreen(req, res, user);
  }

  // Fetch leaderboard data
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/leaderboard`);
    const data: { leaderboard?: Array<{ username?: string; total_score?: number; fid?: string }> } = await response.json();
    
    let leaderboardText = 'Top Players:\n';
    (data.leaderboard ?? []).slice(0, 5).forEach((player, index) => {
      leaderboardText += `${index + 1}. ${player.username ?? player.fid ?? ''}: ${player.total_score ?? 0}\n`;
    });
    
    const image = generateFrameImageUrl('Global Leaderboard', leaderboardText);
    
    const metadata = createFrameMetadata(
      image,
      ['Refresh', 'Back to Home'],
      `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`
    );

    return res.status(200).json({
      ...metadata,
      state: encodeURIComponent(JSON.stringify(currentState)),
    });
  } catch (_error) {
    console.error('Leaderboard fetch error:', _error);
    const image = generateFrameImageUrl('Leaderboard', 'Error loading leaderboard');
    const metadata = createFrameMetadata(
      image,
      ['Try Again', 'Back to Home'],
      `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`
    );

    return res.status(200).json({
      ...metadata,
      state: encodeURIComponent(JSON.stringify(currentState)),
    });
  }
}

async function handleInstructionsScreen(req: NextApiRequest, res: NextApiResponse, user: FarcasterUser, buttonIndex: number, currentState: FrameState | null) {
  const instructions = `How to Play:
• Answer Web3 trivia questions
• Earn 1 point per correct answer  
• Up to 5 sessions per day
• Compete on global leaderboard
• Choose English or Spanish`;

  const image = generateFrameImageUrl('Instructions', instructions);
  
  const metadata = createFrameMetadata(
    image,
    ['Back to Home'],
    `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`
  );

  if (buttonIndex === 1) {
    return handleHomeScreen(req, res, user);
  }

  return res.status(200).json({
    ...metadata,
    state: encodeURIComponent(JSON.stringify(currentState)),
  });
}