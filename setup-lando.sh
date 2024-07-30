#!/bin/bash

# List of commands to run:
commands=(
  "lando rebuild -y"
  "lando composer install"
  "lando generate-oauth-keys"
  "lando drush si minimal -y"
  "lando install-recipe wunder_next_setup"
  "lando drush wunder_next:setup-users-and-consumers"
  "lando drush eshd -y"
  "lando drush eshs"
  "lando drush en wunder_democontent -y"
  "lando drush state:set wunder_democontent.disable_revalidation TRUE"
  "lando drush mim --group=demo_content --execute-dependencies"
  "lando drush pm-uninstall wunder_democontent migrate migrate_tools migrate_plus -y"
  "lando drush state:del wunder_democontent.disable_revalidation"
  "lando drush cron"
  "lando npm i"
  "lando npm run build"
)

last_successful_command=0

status_file=".last_successful_command_lando"

# Parse command-line arguments
clean_run=false

# Function to display the script's usage
show_help() {
  echo "Usage: $0 [-c] [-h]"
  echo "  -c    Clean run (ignore status file if it exists)"
  echo "  -h    Display this help message"
  exit 1
}

while getopts "ch" opt; do
  case $opt in
    c)
      clean_run=true
      ;;
    h)
      show_help
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
  esac
done

# Run the commands
run_commands() {
  for ((i = $last_successful_command; i < ${#commands[@]}; ++i)); do
    command="${commands[$i]}"
    echo "➡️ Running command: $command"
    last_successful_command=$i
    echo $last_successful_command > $status_file
    if eval "$command"; then
      echo "✔ Command successful."
    else
      echo "❌ Command $command failed."
      exit 1
    fi
  done

  # All commands were successful. Remove the status file, show messages to the user, and start the frontend site.
  rm -f "$status_file"
  echo '🚀 All Done!'
  echo '↪️ Use this link to log into the backend as user 1:'
  lando drush uli
  echo '🏎️ Starting the frontend site in production mode...'
  echo '⚠️ Note: the site will be available at https://frontend.lndo.site/ in addition to the usual localhost:3000'
  lando npm run start
}

# Check if the clean run option is set
if [ "$clean_run" = true ]; then
  rm -f "$status_file"
fi

# Check if there's a status file indicating the last successful command
if [ -f "$status_file" ]; then
  read -r last_successful_command < "$status_file"
fi

run_commands
