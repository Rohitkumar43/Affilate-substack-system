-- Database schema for Affiliate Postback System

-- Create tables
CREATE TABLE IF NOT EXISTS affiliates (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS campaigns (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS clicks (
  id SERIAL PRIMARY KEY,
  affiliate_id INTEGER NOT NULL REFERENCES affiliates(id),
  campaign_id INTEGER NOT NULL REFERENCES campaigns(id),
  click_id VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(affiliate_id, campaign_id, click_id)
);

CREATE TABLE IF NOT EXISTS conversions (
  id SERIAL PRIMARY KEY,
  click_id VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data
INSERT INTO affiliates (name) VALUES 
  ('Affiliate 1'),
  ('Affiliate 2'),
  ('Affiliate 3')
ON CONFLICT DO NOTHING;

INSERT INTO campaigns (name) VALUES 
  ('Campaign 1'),
  ('Campaign 2'),
  ('Campaign 3')
ON CONFLICT DO NOTHING;