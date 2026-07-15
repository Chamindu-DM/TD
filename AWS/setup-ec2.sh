#!/bin/bash
# Exit immediately if a command fails
set -e

echo "Starting Production EC2 Setup..."

# 1. Update system packages
sudo apt-get update -y

# 2. Install Docker using the official script
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
rm get-docker.sh # Cleans up (deletes) the installer file after we are done

# 3. Add 'ubuntu' user to the docker group
sudo usermod -aG docker ubuntu

# 4. Create application directories
mkdir -p /home/ubuntu/todo-app/letsencrypt
cd /home/ubuntu/todo-app

# 5. Create Traefik SSL storage with strict permissions
touch /home/ubuntu/todo-app/letsencrypt/acme.json
chmod 600 /home/ubuntu/todo-app/letsencrypt/acme.json

# 6. Download the docker-compose.yml and init.sql files from GitHub
echo "Downloading configuration files from GitHub..."

# (Assuming your repository is public. If it is private, this requires a Personal Access Token)
curl -O https://raw.githubusercontent.com/Chamindu-DM/TD/main/AWS/docker-compose.yml
curl -O https://raw.githubusercontent.com/Chamindu-DM/TD/main/init.sql

echo "✅ EC2 Setup Complete! You MUST log out and log back in for Docker permissions to apply."
echo "After logging back in, just run: cd todo-app && docker compose up -d"
