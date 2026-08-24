ALTER TABLE challenges
  ADD COLUMN creator_session_id TEXT;

ALTER TABLE challenges
  ADD COLUMN parent_challenge_id TEXT
  REFERENCES challenges(id) ON DELETE SET NULL;

ALTER TABLE challenges
  ADD COLUMN root_challenge_id TEXT;

ALTER TABLE challenges
  ADD COLUMN generation INTEGER NOT NULL DEFAULT 0
  CHECK (generation >= 0 AND generation <= 32);

CREATE INDEX IF NOT EXISTS idx_challenges_creator_session
  ON challenges(creator_session_id, created_at);

CREATE INDEX IF NOT EXISTS idx_challenges_parent
  ON challenges(parent_challenge_id, created_at);

CREATE INDEX IF NOT EXISTS idx_challenges_root_generation
  ON challenges(root_challenge_id, generation, created_at);
