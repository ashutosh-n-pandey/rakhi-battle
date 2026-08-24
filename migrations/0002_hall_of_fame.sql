ALTER TABLE challenges
  ADD COLUMN leaderboard_creator_opt_in INTEGER NOT NULL DEFAULT 0
  CHECK (leaderboard_creator_opt_in IN (0, 1));

ALTER TABLE challenges
  ADD COLUMN leaderboard_sibling_opt_in INTEGER NOT NULL DEFAULT 0
  CHECK (leaderboard_sibling_opt_in IN (0, 1));

CREATE INDEX IF NOT EXISTS idx_challenges_hall_of_fame
  ON challenges(status, leaderboard_creator_opt_in, leaderboard_sibling_opt_in, score, completed_at);
