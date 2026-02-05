#!/bin/bash
set -euo pipefail

# Workaround for expired GPG key from packages.sury.org/php
# Temporarily disable the problematic repository
if [ -f /etc/apt/sources.list.d/php.list ]; then
  echo "Temporarily disabling php.list repository to avoid GPG key errors..."
  sudo mv /etc/apt/sources.list.d/php.list /etc/apt/sources.list.d/php.list.bak
  RESTORE_PHP_LIST=true
else
  RESTORE_PHP_LIST=false
fi

# Ensure repository is restored even if script fails
trap 'if [ "$RESTORE_PHP_LIST" = true ]; then sudo mv /etc/apt/sources.list.d/php.list.bak /etc/apt/sources.list.d/php.list 2>/dev/null || true; fi' EXIT

sudo apt-get update
sudo apt-get install -y \
  xvfb \
  libgtk2.0-0 \
  libgtk-3-0 \
  libgbm-dev \
  libnotify-dev \
  libnss3 \
  libxss1 \
  libasound2 \
  libxtst6 \
  xauth

echo "Cypress dependencies installed successfully!"