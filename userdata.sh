# #!/usr/bin/env bash

# curl -sL https://deb.nodesource.com/setup_19.x -o /tmp/nodesource_setup.sh
# sudo apt-get update

# # to remove libnode-dev bc of error
# # Unpacking nodejs (19.9.0-deb-1nodesource1) ...
# # dpkg: error processing archive /var/cache/apt/archives/nodejs_19.9.0-deb-1nodesource1_amd64.deb (--unpack):
# #  trying to overwrite '/usr/include/node/common.gypi', which is also in package libnode-dev 12.22.9~dfsg-1ubuntu3
# # dpkg-deb: error: paste subprocess was killed by signal (Broken pipe)
# # Errors were encountered while processing:
# #  /var/cache/apt/archives/nodejs_19.9.0-deb-1nodesource1_amd64.deb
# # E: Sub-process /usr/bin/dpkg returned an error code (1)

# sudo apt-get remove libnode-dev
# sudo apt-get install nodejs

# sudo npm install pm2@latest -g
# sudo pm2 startup systemd

# sudo apt-get install -y nginx



# echo "
# ----------------------
#   MERN
# ----------------------
# "

# # clone lifecycle project from github into /opt/lifecycle folder
# sudo git clone https://github.com/JuliaGrandury/lifecycle-app-mern.git /opt/lifecycle

# # change permissions from root to ubuntu user
# sudo chown -R ubuntu:ubuntu /opt/lifecycle

# # frontend build command
# cd /opt/lifecycle/frontend && npm install
# npm run build

# # install npm packages for lifecycle
# cd /opt/lifecycle/backend && npm install

# # start lifecycle with pm2
# sudo pm2 start server.js

# # configure nginx reverse proxy
# sudo bash -c 'cat << EOF > /etc/nginx/sites-available/default
# server {
#   listen 80 default_server;
#   server_name _;

#   # react app & front-end files
#   location / {
#     root /opt/lifecycle/frontend/build;
#     try_files \$uri /index.html;
#   }

#   # node api reverse proxy
#   location /api/ {
#     proxy_pass http://localhost:5000/;
#   }
# }
# EOF'

# # restart nginx
# sudo systemctl restart nginx
