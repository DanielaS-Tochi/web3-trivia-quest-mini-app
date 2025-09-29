import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { FarcasterUser } from '@/lib/farcaster';

export interface FarcasterProfile extends FarcasterUser {
  totalScore: number;
  sessionsToday: number;
}

export function useAuth() {
  const [user, setUser] = useState<FarcasterUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<FarcasterProfile | null>(null);

  useEffect(() => {
    // Verificar si hay una sesión guardada
    const savedSession = localStorage.getItem('farcaster_session');
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        setUser(parsed);
        loadUserProfile(parsed);
      } catch (e) {
        console.error('Error loading saved session:', e);
        localStorage.removeItem('farcaster_session');
      }
    }
    setLoading(false);
  }, []);

  const loadUserProfile = async (user: FarcasterUser) => {
    try {
      // Intentar obtener el perfil existente
      const { data: existingProfile, error: fetchError } = await supabase
        .from('player_scores')
        .select('*')
        .eq('fid', user.fid.toString())
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // No es error "not found"
        console.error('Error loading profile:', fetchError);
        return;
      }

      if (existingProfile) {
        setProfile({
          ...user,
          totalScore: existingProfile.total_score,
          sessionsToday: existingProfile.sessions_today
        });
        return;
      }

      // Si no existe, crear nuevo perfil
      const { data: newProfile, error: insertError } = await supabase
        .from('player_scores')
        .insert({
          fid: user.fid.toString(),
          username: user.username,
          display_name: user.displayName,
          pfp_url: user.pfpUrl,
          total_score: 0,
          sessions_today: 0
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating profile:', insertError);
        return;
      }

      if (newProfile) {
        setProfile({
          ...user,
          totalScore: 0,
          sessionsToday: 0
        });
      }
    } catch (error) {
      console.error('Error managing profile:', error);
    }
  };

  const signInWithFarcaster = async () => {
    try {
      setLoading(true);
      
      // En un Frame, el usuario ya está autenticado a través del untrustedData
      // Esta función se usaría solo en el entorno web normal
      const response = await fetch('/api/auth/farcaster', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Error en la autenticación');
      }

      const userData: FarcasterUser = await response.json();
      
      setUser(userData);
      await loadUserProfile(userData);
      
      // Guardar sesión
      localStorage.setItem('farcaster_session', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('farcaster_session');
  };

  return {
    user,
    profile,
    loading,
    signInWithFarcaster,
    signOut,
  };
}