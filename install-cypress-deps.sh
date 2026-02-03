#!/bin/bash
set -euo pipefail

sudo apt-get update
sudo apt-get install -y \
  xvfb \
  libgtk2.0-0t64 \
  libgtk-3-0t64 \
  libgbm-dev \
  libnotify-dev \
  libnss3 \
  libxss1 \
  libasound2t64 \
  libxtst6 \
  xauth