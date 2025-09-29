-- Crear la tabla de jugadores y puntuaciones
CREATE TABLE player_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fid TEXT UNIQUE NOT NULL,
  username TEXT,
  display_name TEXT,
  pfp_url TEXT,
  total_score INTEGER DEFAULT 0,
  sessions_today INTEGER DEFAULT 0,
  last_played TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE player_scores ENABLE ROW LEVEL SECURITY;

-- Crear políticas de seguridad
CREATE POLICY "Permitir lectura pública del ranking"
ON player_scores FOR SELECT
TO anon
USING (true);

CREATE POLICY "Permitir insertar su propio perfil"
ON player_scores FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Permitir actualizar su propio perfil"
ON player_scores FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);

-- Función para actualizar puntuación
CREATE OR REPLACE FUNCTION update_player_score(
  p_fid TEXT,
  p_username TEXT,
  p_score INTEGER
)
RETURNS player_scores
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_player player_scores;
BEGIN
  -- Intentar actualizar el jugador existente
  UPDATE player_scores
  SET 
    total_score = total_score + p_score,
    sessions_today = sessions_today + 1,
    last_played = NOW(),
    updated_at = NOW()
  WHERE fid = p_fid
  RETURNING * INTO v_player;
  
  -- Si no existe, crear nuevo jugador
  IF v_player IS NULL THEN
    INSERT INTO player_scores (fid, username, total_score, sessions_today)
    VALUES (p_fid, p_username, p_score, 1)
    RETURNING * INTO v_player;
  END IF;
  
  RETURN v_player;
END;
$$;