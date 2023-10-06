#!/bin/bash

# List of commands to run
commands=(
  "lando rebuild -y"
  "lando composer install"
  "lando generate-oauth-keys"
  "lando drush si minimal -y"
  "lando install-recipe wunder_next_setup"
  "lando drush wunder_next:setup-user-and-consumer"
  "lando drush eshd -y"
  "lando drush eshs"
  "lando npm i"
  "lando npm run build"
  "(lando npm run start&)"
  "lando drush en wunder_democontent -y"
  "lando drush mim --group=demo_content --execute-dependencies"
  "lando drush uli"
)

last_successful_command=0

status_file=".last_successful_command"

# Run the commands
run_commands() {
  for ((i = $last_successful_command; i < ${#commands[@]}; ++i)); do
    command="${commands[$i]}"
    echo "Running command: $command"
    last_successful_command=$i
    echo $last_successful_command > $status_file
    if eval "$command"; then
      echo "Command successful"
    else
      echo "Command failed"
      exit 1
    fi
  done

  # All commands were successful, remove the status file
  rm -f "$status_file"
  echo "All commands completed successfully"
}

# Check if there's a status file indicating the last successful command
if [ -f "$status_file" ]; then
  read -r last_successful_command < "$status_file"
fi

run_commands
