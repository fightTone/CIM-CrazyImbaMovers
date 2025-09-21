#!/bin/bash

echo "🚀 Building CIM Dota Team Website..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the React application
echo "⚡ Building React application..."
npm run build

# Build Docker image
echo "🐳 Building Docker image..."
docker build -t cim-dota .

echo "✅ Build complete!"
echo "🌐 To run: docker run -p 3000:80 cim-dota"
echo "🔧 Or use: docker-compose up"