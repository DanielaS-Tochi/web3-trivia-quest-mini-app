export interface Player {
  id: string;
  fid: string;
  username: string | null;
  total_score: number;
  sessions_today: number;
  last_played: string;
  created_at: string;
  updated_at: string;
}

export interface GameSession {
  id: string;
  questions: string[];
  currentQuestionIndex: number;
  score: number;
  answers: Record<string, number>;
  completed: boolean;
  language: 'en' | 'es';
}

export interface LeaderboardEntry {
  rank: number;
  fid: string;
  username: string | null;
  total_score: number;
  sessions_today: number;
}

export type Language = 'en' | 'es';

export interface Translations {
  en: Record<string, string>;
  es: Record<string, string>;
}