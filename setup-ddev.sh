#!/bin/bash

# List of commands to run:
commands=(
  "ddev delete -y -O"
  "ddev start"
  "ddev composer install"
  "ddev generate-oauth-keys"
  "ddev drush si minimal -y"
  "ddev drush recipe ../recipes/wunder_next_setup -y"
  "ddev drush wunder_next:setup-users-and-consumers"
  "ddev drush eshd -y"
  "ddev drush eshs"
  "ddev drush en wunder_democontent -y"
  "ddev drush state:set wunder_democontent.disable_revalidation TRUE"
  "ddev drush mim --group=demo_content --execute-dependencies"
  "ddev drush pm-uninstall wunder_democontent migrate migrate_tools migrate_plus -y"
  "ddev drush state:del wunder_democontent.disable_revalidation"
  "ddev drush queue:run elasticsearch_helper_indexing"
  "echo '⏳ Waiting for Drupal OAuth endpoint to be ready...'; for i in {1..30}; do ddev exec curl -s -o /dev/null -w '%{http_code}' https://next-drupal-starterkit.ddev.site/oauth/token | grep -q '400\\|401' && echo '✓ Drupal is ready!' && break || echo \"Attempt \$i/30: Drupal not ready yet, waiting...\"; sleep 2; done"
  "cd next && ddev npm run build"
)

last_successful_command=0

status_file=".last_successful_command_ddev"

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
  echo '🚀 All done!'
  ddev describe
  echo '↪️ Use this link to log into the backend as user 1:'
  ddev drush uli
  echo '🏎️ Starting the frontend site in production mode...'
  echo '⚠️️️️⚠️️️️⚠️️️️ Note: the site will be available at https://frontend.ddev.site, not localhost:3000 as the output of next start suggests.'
  ddev npm run start
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
