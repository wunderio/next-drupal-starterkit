#!/bin/bash

## Description: Helper script to install a recipe with ddev.
## Usage: install-recipe <directory name of recipe inside /recipes>
## Example: "ddev  install-recipe wunder_next_setup"

recipe_directory_name="$1"

if [ $# -eq 0 ]; then
 echo "Usage: specify the directory name inside of drupal/recipes/ that you want to install:"
 cd drupal/recipes/
 ls -d -- */
 exit 1
fi

cd drupal/web

php core/scripts/drupal recipe ../recipes/"$recipe_directory_name"

../vendor/bin/drush cr
