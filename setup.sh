#!/bin/bash

# Modern Minesweeper Setup Script
# This script sets up the development environment

set -e

echo "🚀 Setting up Modern Minesweeper..."

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version check passed: $(node -v)"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server && npm install
cd ..

# Set up environment variables
if [ ! -f ".env" ]; then
    echo "🔧 Setting up environment variables..."
    cp .env.example .env
    echo "✅ Created .env file. Please edit it with your configuration."
else
    echo "⚠️  .env file already exists. Skipping..."
fi

# Create initial scores file for server
if [ ! -f "server/scores.json" ]; then
    echo "📊 Creating initial scores file..."
    echo "[]" > server/scores.json
    echo "✅ Created server/scores.json"
fi

# Run type check
echo "🔍 Running TypeScript type check..."
npm run type-check

# Run tests
echo "🧪 Running tests..."
npm test -- --watchAll=false --coverage

echo "🧪 Running server tests..."
cd server && npm test
cd ..

# Build the project
echo "🏗️  Building the project..."
npm run build

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start development:"
echo "  Frontend: npm start (runs on http://localhost:3000)"
echo "  Backend:  cd server && npm run dev (runs on http://localhost:5000)"
echo ""
echo "To run production build:"
echo "  cd server && NODE_ENV=production npm start"
echo ""
echo "To run with Docker:"
echo "  docker-compose up -d"
echo ""
echo "Happy coding! 💣✨"
