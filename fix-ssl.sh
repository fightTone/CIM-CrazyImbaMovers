#!/bin/bash

# 🔧 CIM Dota Team - SSL Fix Script
# Fixes the Let's Encrypt container configuration issue

echo "🔧 Fixing SSL Configuration..."
echo "=============================="

echo "🛑 Stopping current deployment..."
docker-compose -f docker-compose.prod.yml down

echo "🧹 Cleaning up containers..."
docker rm -f nginx-proxy nginx-proxy-letsencrypt cim-dota-prod 2>/dev/null || true

echo "🗑️ Removing old volumes..."
docker volume rm nginx-proxy-certs nginx-proxy-vhost nginx-proxy-html 2>/dev/null || true

echo "🌐 Recreating network..."
docker network rm nginx-proxy 2>/dev/null || true
docker network create nginx-proxy

echo "🚀 Redeploying with fixed configuration..."
docker-compose -f docker-compose.prod.yml up -d --build

echo "⏳ Waiting for containers to start..."
sleep 10

echo ""
echo "📊 New deployment status:"
docker-compose -f docker-compose.prod.yml ps

echo ""
echo "🔍 Checking Let's Encrypt logs..."
docker logs nginx-proxy-letsencrypt --tail 10

echo ""
echo "✅ SSL fix applied!"
echo "🕐 SSL certificate generation will start automatically"
echo "⏳ Please wait 5-15 minutes for HTTPS to work"
echo ""
echo "🔍 Monitor progress with:"
echo "   docker logs nginx-proxy-letsencrypt -f"