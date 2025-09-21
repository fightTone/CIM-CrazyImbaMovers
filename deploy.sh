#!/bin/bash

# 🚀 CIM Dota Team - Production Deployment Script
# Deploy to: https://cim.pietone.com
# Author: Claude Code

set -e

echo "⚡ CIM Dota Team - Production Deployment"
echo "========================================="
echo "🌐 Domain: https://cim.pietone.com"
echo "🐳 Using Docker + Nginx + Let's Encrypt SSL"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="cim.pietone.com"
EMAIL="admin@pietone.com"  # Change this to your email
APP_NAME="cim-dota"
CONTAINER_NAME="cim-dota-prod"
NGINX_CONTAINER="nginx-proxy"
LETSENCRYPT_CONTAINER="nginx-proxy-letsencrypt"

echo -e "${BLUE}📋 Configuration:${NC}"
echo -e "   Domain: ${GREEN}$DOMAIN${NC}"
echo -e "   Email: ${GREEN}$EMAIL${NC}"
echo -e "   App: ${GREEN}$APP_NAME${NC}"
echo ""

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   echo -e "${RED}❌ Don't run this script as root!${NC}"
   echo -e "   Run as a regular user with sudo privileges."
   exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed!${NC}"
    echo -e "   Please install Docker first: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed!${NC}"
    echo -e "   Please install Docker Compose first."
    exit 1
fi

echo -e "${YELLOW}🔍 Checking prerequisites...${NC}"

# Function to check if container exists
container_exists() {
    docker ps -a --format "table {{.Names}}" | grep -q "^$1$"
}

# Function to check if container is running
container_running() {
    docker ps --format "table {{.Names}}" | grep -q "^$1$"
}

# Step 1: Stop existing containers
echo -e "${YELLOW}🛑 Stopping existing containers...${NC}"
if container_running "$CONTAINER_NAME"; then
    docker stop "$CONTAINER_NAME"
    echo -e "${GREEN}✅ Stopped $CONTAINER_NAME${NC}"
fi

if container_exists "$CONTAINER_NAME"; then
    docker rm "$CONTAINER_NAME"
    echo -e "${GREEN}✅ Removed $CONTAINER_NAME${NC}"
fi

# Step 2: Build the application
echo -e "${YELLOW}🔨 Building CIM Dota application...${NC}"
echo -e "${BLUE}   Building React production bundle...${NC}"
npm run build

echo -e "${BLUE}   Building Docker image...${NC}"
docker build -t $APP_NAME .

echo -e "${GREEN}✅ Application built successfully!${NC}"

# Step 3: Create Docker network if it doesn't exist
echo -e "${YELLOW}🌐 Setting up Docker network...${NC}"
if ! docker network ls | grep -q "nginx-proxy"; then
    docker network create nginx-proxy
    echo -e "${GREEN}✅ Created nginx-proxy network${NC}"
else
    echo -e "${GREEN}✅ nginx-proxy network already exists${NC}"
fi

# Step 4: Setup Nginx Proxy if not running
echo -e "${YELLOW}🔧 Setting up Nginx reverse proxy...${NC}"
if ! container_running "$NGINX_CONTAINER"; then
    echo -e "${BLUE}   Starting nginx-proxy container...${NC}"
    docker run -d \\
        --name $NGINX_CONTAINER \\
        --restart unless-stopped \\
        -p 80:80 \\
        -p 443:443 \\
        -v /var/run/docker.sock:/tmp/docker.sock:ro \\
        -v nginx-proxy-certs:/etc/nginx/certs \\
        -v nginx-proxy-vhost:/etc/nginx/vhost.d \\
        -v nginx-proxy-html:/usr/share/nginx/html \\
        --network nginx-proxy \\
        nginxproxy/nginx-proxy

    echo -e "${GREEN}✅ Nginx proxy started${NC}"
else
    echo -e "${GREEN}✅ Nginx proxy already running${NC}"
fi

# Step 5: Setup Let's Encrypt if not running
echo -e "${YELLOW}🔒 Setting up Let's Encrypt SSL...${NC}"
if ! container_running "$LETSENCRYPT_CONTAINER"; then
    echo -e "${BLUE}   Starting Let's Encrypt companion...${NC}"
    docker run -d \\
        --name $LETSENCRYPT_CONTAINER \\
        --restart unless-stopped \\
        -v /var/run/docker.sock:/var/run/docker.sock:ro \\
        -v nginx-proxy-certs:/etc/nginx/certs \\
        -v nginx-proxy-vhost:/etc/nginx/vhost.d \\
        -v nginx-proxy-html:/usr/share/nginx/html \\
        --network nginx-proxy \\
        --env DEFAULT_EMAIL=$EMAIL \\
        nginxproxy/acme-companion

    echo -e "${GREEN}✅ Let's Encrypt companion started${NC}"
else
    echo -e "${GREEN}✅ Let's Encrypt companion already running${NC}"
fi

# Step 6: Deploy the application
echo -e "${YELLOW}🚀 Deploying CIM Dota application...${NC}"
docker run -d \\
    --name $CONTAINER_NAME \\
    --restart unless-stopped \\
    --network nginx-proxy \\
    --env VIRTUAL_HOST=$DOMAIN \\
    --env LETSENCRYPT_HOST=$DOMAIN \\
    --env LETSENCRYPT_EMAIL=$EMAIL \\
    $APP_NAME

echo -e "${GREEN}✅ Application deployed successfully!${NC}"

# Step 7: Wait for SSL certificate
echo -e "${YELLOW}⏳ Waiting for SSL certificate generation...${NC}"
echo -e "${BLUE}   This may take a few minutes for first-time setup...${NC}"

# Wait for the container to be healthy
sleep 10

# Check if application is responding
echo -e "${YELLOW}🔍 Checking application health...${NC}"
for i in {1..30}; do
    if docker exec $CONTAINER_NAME wget --spider -q http://localhost/ 2>/dev/null; then
        echo -e "${GREEN}✅ Application is responding!${NC}"
        break
    fi

    if [ $i -eq 30 ]; then
        echo -e "${RED}❌ Application health check failed${NC}"
        echo -e "${YELLOW}📋 Checking logs...${NC}"
        docker logs $CONTAINER_NAME --tail 20
        exit 1
    fi

    echo -e "${BLUE}   Attempt $i/30 - waiting for application...${NC}"
    sleep 2
done

# Final status check
echo -e "${YELLOW}📊 Deployment Status:${NC}"
echo ""
echo -e "${GREEN}✅ Docker containers running:${NC}"
docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}" | grep -E "(nginx-proxy|letsencrypt|$CONTAINER_NAME)"

echo ""
echo -e "${GREEN}🎉 DEPLOYMENT SUCCESSFUL! 🎉${NC}"
echo ""
echo -e "${BLUE}🌐 Your CIM Dota website is now live at:${NC}"
echo -e "${GREEN}   https://$DOMAIN${NC}"
echo ""
echo -e "${YELLOW}📝 Next steps:${NC}"
echo -e "   1. Update your DNS A record to point $DOMAIN to this server's IP"
echo -e "   2. Wait 5-15 minutes for SSL certificate generation"
echo -e "   3. Visit https://$DOMAIN to see your electric Dota team!"
echo ""
echo -e "${BLUE}⚡ Useful commands:${NC}"
echo -e "   View logs: ${GREEN}docker logs $CONTAINER_NAME${NC}"
echo -e "   Restart app: ${GREEN}docker restart $CONTAINER_NAME${NC}"
echo -e "   Update app: ${GREEN}./deploy.sh${NC}"
echo ""
echo -e "${GREEN}🎮 Ready for some electric Dota action! ⚡${NC}"