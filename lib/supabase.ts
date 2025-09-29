import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
  throw new Error('Missing required Supabase environment variables');
}

// Client for browser operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

export type Database = {
  public: {
    Tables: {
      player_scores: {
        Row: {
          id: string;
          fid: string;
          username: string | null;
          total_score: number;
          sessions_today: number;
          last_played: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          fid: string;
          username?: string | null;
          total_score?: number;
          sessions_today?: number;
          last_played?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          fid?: string;
          username?: string | null;
          total_score?: number;
          sessions_today?: number;
          last_played?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};