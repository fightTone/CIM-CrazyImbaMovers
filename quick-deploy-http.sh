#!/bin/bash

# 🚀 CIM Dota Team - Quick HTTP Deploy (no SSL)
# For testing before DNS is configured

echo "⚡ CIM Dota Team - HTTP Deploy (Testing Mode)"
echo "============================================="

# Build the app
echo "🔨 Building application..."
npm run build

# Deploy with HTTP only
echo "🚀 Deploying HTTP version..."
docker-compose -f docker-compose.http.yml up -d --build

# Show status
echo ""
echo "📊 Deployment Status:"
docker-compose -f docker-compose.http.yml ps

echo ""
echo "🎉 DEPLOYED! 🎉"
echo "🌐 Your site is available at:"
echo "   http://$(curl -s ifconfig.me)/ (Server IP)"
echo "   http://cim.pietone.com/ (once DNS is configured)"
echo ""
echo "💡 Next steps:"
echo "   1. Test with server IP first"
echo "   2. Configure DNS A record for cim.pietone.com"
echo "   3. Run ./quick-deploy.sh for HTTPS"