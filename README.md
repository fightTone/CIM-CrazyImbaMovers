# CIM - Crazy Imba Movers

A stunning electric-themed website for the CIM Dota team, featuring modern animations, electric borders, and team member profiles.

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Start development server
npm start
```

### 🌐 Production Deployment to https://cim.pietone.com

#### Option 1: One-Command Deploy (Recommended)
```bash
# Deploy with automatic HTTPS setup
./quick-deploy.sh
```

#### Option 2: Full Control Deploy
```bash
# Comprehensive deployment with detailed output
./deploy.sh
```

#### Option 3: Manual Docker Compose
```bash
# Build and deploy manually
npm run build
docker network create nginx-proxy
docker-compose -f docker-compose.prod.yml up -d --build
```

### 📊 Production Management

```bash
# Check deployment status
./status.sh

# Debug SSL issues
./debug-ssl.sh

# Fix SSL configuration
./fix-ssl.sh

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Restart application
docker-compose -f docker-compose.prod.yml restart cim-dota

# Stop everything
docker-compose -f docker-compose.prod.yml down
```

## 🔄 **Updating Your Website**

### **When You Need to Rebuild (React/Frontend Changes):**
- ✅ Changes to `src/` folder (React components, CSS, JavaScript)
- ✅ New features or UI updates
- ✅ Changes to `package.json` dependencies
- ✅ Changes to `Dockerfile` or `nginx.conf`

```bash
# For frontend changes - full rebuild
git pull
./quick-deploy.sh
```

### **When You Don't Need to Rebuild (Config-Only Changes):**
- ❌ Changes to `docker-compose.prod.yml`
- ❌ Changes to shell scripts (`.sh` files)
- ❌ Documentation updates (`README.md`)

```bash
# For config-only changes - just restart
git pull
docker-compose -f docker-compose.prod.yml up -d
```

### **🎯 Simple Rule:**
- **Changed React code?** → Use `./quick-deploy.sh` (rebuilds)
- **Changed only config files?** → Use `docker-compose restart`
- **When in doubt?** → Use `./quick-deploy.sh` (always safe!)

## 🌐 Access the Website

- **Development**: `http://localhost:3000`
- **Production**: `https://cim.pietone.com` ⚡

## 📦 Deployment

### For Cloud Deployment:

1. **Push to GitHub/GitLab**
2. **Deploy to Vercel/Netlify** (easiest):
   ```bash
   # Build for production
   npm run build

   # Deploy build folder
   ```

3. **Deploy to VPS with Docker**:
   ```bash
   # On your server
   git clone <your-repo>
   cd CIM-Dota
   docker-compose up -d --build
   ```

## ⚡ Features

- Electric-themed animations and borders
- Modern React components
- Responsive design
- Docker containerization
- Nginx optimization
- Team member profiles
- Electric sound effects
- Smooth animations

## 🎮 Team Members

The website showcases 5 team members with their:
- MMR ratings
- Win streaks
- Games won
- Favorite heroes
- Player photos

## 🔧 Tech Stack

- React 18
- CSS3 with electric animations
- SVG filters for electric effects
- Nginx for production serving
- Docker for containerization

## 📱 Responsive

Fully responsive design that works on:
- Desktop
- Tablet
- Mobile

Enjoy your electric gaming website! ⚡