#!/bin/bash

#
# Helper script to install a recipe inside lando.
#
# Usage:
# lando install-recipe <directory name of recipe inside /recipes>
#

recipe_directory_name="$1"

if [ $# -eq 0 ]; then
 echo "Usage: specify the directory name inside of /app/recipes/ that you want to install:"
 cd /app/recipes/
 ls -d -- */
 exit 1
fi

php core/scripts/drupal recipe ../recipes/"$recipe_directory_name"
/app/drupal/vendor/bin/drush cr
