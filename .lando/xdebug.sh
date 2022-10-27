#!/bin/bash

#
# Helper script to control Xdebug.
#
# Usage:
# lando xdebug <mode>
# where modes are listed at https://xdebug.org/docs/all_settings#mode.
#

set -eu

# List of allowed Xdebug modes.
ARRAY_ALLOWED_XDEBUG_MODES=(
  "off"
  "develop"
  "coverage"
  "debug"
  "gcstats"
  "profile"
  "trace"
)

# Split the commands from imput to array using comma as delimiter.
array_modes_from_input=$(echo "${1-}" | tr "," "\n")

found_invalid_mode=false
for mode_from_input in ${array_modes_from_input[@]}; do
  is_valid_mode=false
  for value in ${ARRAY_ALLOWED_XDEBUG_MODES[@]}; do
    if [ "$mode_from_input" == "$value" ]; then
      is_valid_mode=true
    fi
  done

  if [ "$is_valid_mode" == 'false' ] && [ "$found_invalid_mode" == 'false' ]; then
    found_invalid_mode=true
  fi
done

if [ "$#" -ne 1 ]; then
  echo "Xdebug has been turned off, please use the following syntax: 'lando xdebug <mode>'."
  echo "Valid modes: https://xdebug.org/docs/all_settings#mode."
  echo xdebug.mode = off > /usr/local/etc/php/conf.d/zzz-lando-xdebug.ini
  pkill -o -USR2 php-fpm
elif [ "$found_invalid_mode" == 'true' ]; then
  echo "'$1' is invalid mode for Xdebug. Valid modes are: https://xdebug.org/docs/all_settings#mode."
else
  mode="$1"
  echo xdebug.mode = "$mode" > /usr/local/etc/php/conf.d/zzz-lando-xdebug.ini
  pkill -o -USR2 php-fpm
  echo "Xdebug is loaded in "$mode" mode."
fi
