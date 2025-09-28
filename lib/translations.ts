import { Translations } from '@/types';

export const translations: Translations = {
  en: {
    // Home screen
    welcome: 'Welcome to Web3 Trivia Quest!',
    subtitle: 'Learn Web3 while you compete',
    playTrivia: 'Play Trivia',
    viewLeaderboard: 'View Leaderboard',
    instructions: 'Instructions',
    selectLanguage: 'Select Language',
    
    // Game
    question: 'Question',
    of: 'of',
    score: 'Score',
    correct: 'Correct!',
    incorrect: 'Incorrect!',
    nextQuestion: 'Next Question',
    finishGame: 'Finish Game',
    gameComplete: 'Game Complete!',
    yourScore: 'Your Score',
    saveScore: 'Save Score',
    playAgain: 'Play Again',
    
    // Leaderboard  
    leaderboard: 'Global Leaderboard',
    rank: 'Rank',
    player: 'Player',
    totalScore: 'Total Score',
    sessionsToday: 'Sessions Today',
    refresh: 'Refresh',
    backToHome: 'Back to Home',
    
    // Instructions
    instructionsTitle: 'How to Play',
    rule1: 'Answer Web3 trivia questions to earn points',
    rule2: 'Each correct answer gives you 1 point',
    rule3: 'Complete sessions to climb the global leaderboard',
    rule4: 'You can play up to 5 sessions per day',
    rule5: 'Choose your preferred language (English or Spanish)',
    
    // Messages
    dailyLimitReached: 'Daily limit reached! Try again tomorrow.',
    scoreSaved: 'Score saved successfully!',
    errorSavingScore: 'Error saving score. Please try again.',
    noQuestionsAvailable: 'No questions available.',
    loading: 'Loading...',
    
    // Errors
    errorLoadingLeaderboard: 'Error loading leaderboard',
    errorStartingGame: 'Error starting game',
    tryAgain: 'Try Again',
  },
  es: {
    // Home screen  
    welcome: '¡Bienvenido a Web3 Trivia Quest!',
    subtitle: 'Aprende Web3 mientras compites',
    playTrivia: 'Jugar Trivia',
    viewLeaderboard: 'Ver Ranking',
    instructions: 'Instrucciones',
    selectLanguage: 'Seleccionar Idioma',
    
    // Game
    question: 'Pregunta',
    of: 'de',
    score: 'Puntuación',
    correct: '¡Correcto!',
    incorrect: '¡Incorrecto!',
    nextQuestion: 'Siguiente Pregunta',
    finishGame: 'Terminar Juego',
    gameComplete: '¡Juego Completado!',
    yourScore: 'Tu Puntuación',
    saveScore: 'Guardar Puntuación',
    playAgain: 'Jugar de Nuevo',
    
    // Leaderboard
    leaderboard: 'Ranking Global',
    rank: 'Rango',
    player: 'Jugador',
    totalScore: 'Puntuación Total',
    sessionsToday: 'Sesiones Hoy',
    refresh: 'Actualizar',
    backToHome: 'Volver al Inicio',
    
    // Instructions
    instructionsTitle: 'Cómo Jugar',
    rule1: 'Responde preguntas de trivia Web3 para ganar puntos',
    rule2: 'Cada respuesta correcta te da 1 punto',
    rule3: 'Completa sesiones para subir en el ranking global',
    rule4: 'Puedes jugar hasta 5 sesiones por día',
    rule5: 'Elige tu idioma preferido (Inglés o Español)',
    
    // Messages
    dailyLimitReached: '¡Límite diario alcanzado! Intenta mañana.',
    scoreSaved: '¡Puntuación guardada exitosamente!',
    errorSavingScore: 'Error guardando puntuación. Intenta de nuevo.',
    noQuestionsAvailable: 'No hay preguntas disponibles.',
    loading: 'Cargando...',
    
    // Errors
    errorLoadingLeaderboard: 'Error cargando ranking',
    errorStartingGame: 'Error iniciando juego',
    tryAgain: 'Intentar de Nuevo',
  },
};

export function t(key: string, language: 'en' | 'es'): string {
  return translations[language][key] || key;
}