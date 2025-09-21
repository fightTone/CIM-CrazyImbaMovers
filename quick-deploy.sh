#!/bin/bash

# 🚀 CIM Dota Team - Quick Deployment Script
# One-command deployment to https://cim.pietone.com

echo "⚡ CIM Dota Team - Quick Deploy to Production"
echo "============================================="

# Build the app
echo "🔨 Building application..."
npm run build

# Create Docker network
echo "🌐 Setting up network..."
docker network create nginx-proxy 2>/dev/null || true

# Deploy with docker-compose
echo "🚀 Deploying to production..."
docker-compose -f docker-compose.prod.yml up -d --build

# Show status
echo ""
echo "📊 Deployment Status:"
docker-compose -f docker-compose.prod.yml ps

echo ""
echo "🎉 DEPLOYED! 🎉"
echo "🌐 Your site will be available at: https://cim.pietone.com"
echo "⏳ SSL certificate will be generated automatically (may take 5-15 minutes)"
echo ""
echo "💡 Commands:"
echo "   View logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "   Stop: docker-compose -f docker-compose.prod.yml down"
echo "   Restart: docker-compose -f docker-compose.prod.yml restart"