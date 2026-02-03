#!/bin/bash
set -euo pipefail

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