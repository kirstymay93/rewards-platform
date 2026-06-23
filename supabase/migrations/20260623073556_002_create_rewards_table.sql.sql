-- Create rewards table
CREATE TABLE IF NOT EXISTS rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  points_cost INT NOT NULL,
  category VARCHAR(100),
  image_url VARCHAR(255),
  rating DECIMAL(3, 1) DEFAULT 4.5,
  available INT DEFAULT 100,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on category and status
CREATE INDEX IF NOT EXISTS idx_rewards_category ON rewards(category);
CREATE INDEX IF NOT EXISTS idx_rewards_status ON rewards(status);
