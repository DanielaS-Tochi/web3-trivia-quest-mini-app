import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

export function AuthButton() {
  const { user, profile, loading, signInWithFarcaster, signOut } = useAuth();

  if (loading) {
    return (
      <Button variant="outline" disabled>
        Cargando...
      </Button>
    );
  }

  if (user && profile) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          {profile.username || `FID: ${profile.fid}`}
        </span>
        <Button variant="outline" size="sm" onClick={signOut}>
          Cerrar Sesión
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={signInWithFarcaster}>
      Conectar con Farcaster
    </Button>
  );
}