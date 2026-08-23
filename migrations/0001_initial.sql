PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS challenges (
  id TEXT PRIMARY KEY,
  creator_name TEXT NOT NULL,
  sibling_name TEXT,
  creator_answers TEXT NOT NULL,
  sibling_answers TEXT,
  score INTEGER,
  result_json TEXT,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'complete')),
  source TEXT NOT NULL DEFAULT 'direct',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at TEXT,
  expires_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_challenges_status_created
  ON challenges(status, created_at);

CREATE TABLE IF NOT EXISTS court_votes (
  id TEXT PRIMARY KEY,
  challenge_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  votes_json TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'court',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE,
  UNIQUE(challenge_id, session_id)
);

CREATE INDEX IF NOT EXISTS idx_court_votes_challenge
  ON court_votes(challenge_id, created_at);

CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_name TEXT NOT NULL,
  session_id TEXT NOT NULL,
  challenge_id TEXT,
  source TEXT NOT NULL DEFAULT 'direct',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  payload_json TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_events_name_created
  ON events(event_name, created_at);
CREATE INDEX IF NOT EXISTS idx_events_session
  ON events(session_id, created_at);

CREATE TABLE IF NOT EXISTS purchases (
  order_id TEXT PRIMARY KEY,
  challenge_id TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('savage', 'full')),
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'paid', 'failed')),
  provider_payment_id TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_purchases_challenge_status
  ON purchases(challenge_id, status);
