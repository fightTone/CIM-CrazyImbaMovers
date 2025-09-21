#!/bin/bash

# 🔍 CIM Dota Team - SSL Debug Script

echo "🔍 SSL Certificate Debug for cim.pietone.com"
echo "=============================================="

DOMAIN="cim.pietone.com"

echo "📋 1. Checking container status..."
docker ps --format "table {{.Names}}\t{{.Status}}" | grep -E "(nginx-proxy|letsencrypt|cim-dota)"

echo ""
echo "📋 2. Checking Let's Encrypt logs..."
echo "Recent errors from Let's Encrypt:"
docker logs nginx-proxy-letsencrypt --tail 20

echo ""
echo "📋 3. Checking DNS resolution..."
echo "DNS lookup for $DOMAIN:"
nslookup $DOMAIN || echo "❌ DNS lookup failed"

echo ""
echo "📋 4. Checking if domain points to this server..."
SERVER_IP=$(curl -s ifconfig.me || curl -s ipinfo.io/ip)
DOMAIN_IP=$(nslookup $DOMAIN | grep "Address:" | tail -1 | awk '{print $2}')
echo "Server IP: $SERVER_IP"
echo "Domain IP: $DOMAIN_IP"

if [ "$SERVER_IP" = "$DOMAIN_IP" ]; then
    echo "✅ DNS correctly points to this server"
else
    echo "❌ DNS does not point to this server yet"
    echo "   Please update your DNS A record to: $SERVER_IP"
fi

echo ""
echo "📋 5. Testing HTTP connectivity..."
if curl -s -o /dev/null -w "%{http_code}" http://$DOMAIN/ | grep -q "200"; then
    echo "✅ HTTP is working"
else
    echo "❌ HTTP is not accessible from outside"
fi

echo ""
echo "📋 6. Testing HTTPS connectivity..."
if curl -s -k -o /dev/null -w "%{http_code}" https://$DOMAIN/ | grep -q "200"; then
    echo "✅ HTTPS is working"
else
    echo "❌ HTTPS is not working yet"
fi

echo ""
echo "📋 7. Checking nginx-proxy configuration..."
docker exec nginx-proxy ls -la /etc/nginx/certs/ | grep $DOMAIN || echo "❌ No SSL certificates found for $DOMAIN"

echo ""
echo "💡 Common solutions:"
echo "   1. Wait 5-15 minutes for DNS to propagate"
echo "   2. Ensure your domain's A record points to: $SERVER_IP"
echo "   3. Check if port 80 and 443 are open on your firewall"
echo "   4. Make sure $DOMAIN is accessible from the internet"

echo ""
echo "🔄 To restart SSL generation:"
echo "   docker-compose -f docker-compose.prod.yml restart letsencrypt"