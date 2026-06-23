#!/usr/bin/env bash
set -e

echo "🚀 NEXO Store — VPS Deploy Script"

# 1. Install dependencies
echo "📦 Installing dependencies..."
npm ci

# 2. Build
echo "🔨 Building..."
npm run build

# 3. Start with PM2 (or restart if already running)
echo "🟢 Starting with PM2..."
if pm2 list | grep -q "nexo-store"; then
  pm2 restart ecosystem.config.js --env production
else
  pm2 start ecosystem.config.js --env production
fi

pm2 save

echo "✅ Deploy finished. App running on port 3000."
