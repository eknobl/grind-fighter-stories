-- Ilion Ring — ring_users table
-- Run this once in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS ring_users (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  github_id    BIGINT UNIQUE NOT NULL,
  username     TEXT NOT NULL,
  avatar_url   TEXT,
  ring_angle   FLOAT8 NOT NULL,          -- radians, assigned at registration
  repo_count   INT DEFAULT 0,
  star_count   INT DEFAULT 0,
  top_language TEXT,
  last_synced  TIMESTAMPTZ DEFAULT NOW(),
  joined_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Fast range queries for the viewer LOD
CREATE INDEX IF NOT EXISTS ring_users_angle_idx ON ring_users (ring_angle);

-- Row Level Security (read-only for anon, write via service_role only)
ALTER TABLE ring_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read ring_users"
  ON ring_users FOR SELECT USING (true);
