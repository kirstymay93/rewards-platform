-- Create reward transactions table
CREATE TABLE IF NOT EXISTS reward_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reward_id UUID NOT NULL REFERENCES rewards(id) ON DELETE SET NULL,
  type VARCHAR(50) NOT NULL,
  points INT NOT NULL,
  status VARCHAR(50) DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_reward_transactions_user ON reward_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_reward_transactions_type ON reward_transactions(type);
CREATE INDEX IF NOT EXISTS idx_reward_transactions_created ON reward_transactions(created_at);
