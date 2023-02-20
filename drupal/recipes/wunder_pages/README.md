### Wunder pages recipe

When installed, this recipe will create:

* a "page" content type with:
  * field definitions
  * pathauto settings
  * paragraphs
* a "frontpage" content type with:
  * field definitions
  * pathauto settings
  * paragraphs

### Manual Installation instructions

The recipe can be installed using these lando commands:

1. `lando composer require drupal/pathauto:^1.11 drupal/paragraphs:^1.15`
2. `lando install-recipe wunder_pages`
3. `lando drush cex -y` <- export your configuration
4. commit `composer.json`, `composer.lock` and the updated configuration.

### Testing on an empty site

(Caution, this command will re-install the site)

```shell
lando drush si -y && lando install-recipe wunder_pages && lando drush uli
```
