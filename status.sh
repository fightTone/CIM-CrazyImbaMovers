#!/bin/bash

# 📊 CIM Dota Team - Status Check Script

echo "⚡ CIM Dota Team - Production Status"
echo "===================================="

# Check if containers are running
echo "🐳 Docker Containers:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -E "(nginx-proxy|letsencrypt|cim-dota)" || echo "❌ No CIM containers found"

echo ""
echo "🌐 SSL Certificate Status:"
docker exec nginx-proxy-letsencrypt /app/cert_status cim.pietone.com 2>/dev/null || echo "⏳ SSL setup in progress..."

echo ""
echo "📋 Application Logs (last 10 lines):"
docker logs cim-dota-prod --tail 10 2>/dev/null || echo "❌ Application container not found"

echo ""
echo "🔍 Quick Health Check:"
if curl -s -o /dev/null -w "%{http_code}" http://localhost/ | grep -q "200"; then
    echo "✅ Application responding locally"
else
    echo "❌ Application not responding locally"
fi

echo ""
echo "🌍 Test your site: https://cim.pietone.com"