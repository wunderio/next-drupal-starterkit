### Drupal recipes

This directory contains examples of drupal recipes, as defined by the [Distributions and recipes core initiative](https://www.drupal.org/project/distributions_recipes).

The initiative is ongoing and currently we are gathering here our experiments to evaluate whether we can use this new
feature of Drupal to establish a set of common recipes to be used in wunder projects.

Recipes are installed using a script that has been added to Lando (check `.lando.yml`).

### Installing recipes with composer

A working `composer.json` is provided in each recipe for illustration purposes.

The [Distributions and recipes initiative](https://www.drupal.org/project/distributions_recipes) plans to add a composer
plugin that will be able to [unpack](http://fabien.potencier.org/symfony4-unpack-the-packs.html) the dependencies specified in
the recipe's `composer.json` file into the project's `composer.json` file, which will make it easier to update the
modules when needed in the rest of the lifecycle of the project.

Until then, manual installation of the dependencies seems to be the way to go, so follow the manual installation instructions for each recipe.

Check the `README.md` file in each recipe subdirectory for more information about how they can be used and installed.
