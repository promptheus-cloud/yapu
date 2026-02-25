#!/bin/bash
# Run once on a fresh VPS (Ubuntu/Debian)
set -e

curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs nginx certbot python3-certbot-nginx git
npm install -g pm2
pm2 startup

echo ""
echo "Server ready. Next steps:"
echo "1. Clone repo: git clone <URL> /home/APP_NAME/"
echo "2. Copy nginx config: cp server/nginx.conf.template /etc/nginx/sites-available/APP_NAME"
echo "3. Edit: replace {{DOMAIN}} and {{PORT}}"
echo "4. Enable: ln -s /etc/nginx/sites-available/APP_NAME /etc/nginx/sites-enabled/"
echo "5. SSL: certbot --nginx -d DOMAIN"
echo "6. Build: cd /home/APP_NAME && npm ci && npm run build"
echo "7. Start: pm2 start ecosystem.config.js && pm2 save"
