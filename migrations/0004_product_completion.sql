ALTER TABLE challenges
  ADD COLUMN sibling_progress INTEGER NOT NULL DEFAULT 0
  CHECK (sibling_progress >= 0 AND sibling_progress <= 8);

CREATE TABLE IF NOT EXISTS support_requests (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('payment', 'delivery', 'privacy', 'technical', 'other')),
  email TEXT NOT NULL,
  challenge_id TEXT,
  session_id TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_support_status_created
  ON support_requests(status, created_at);

CREATE INDEX IF NOT EXISTS idx_support_session_created
  ON support_requests(session_id, created_at);
