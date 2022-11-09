### Wunder Articles section example recipe

This recipe is an example of installing and configuring a recipe.

When installed, this recipe will create:

* a "wunder article" content type with:
  * field definitions
  * pathauto settings
* a "wunder article view" available at `/wunder-articles` listing content of type wunder article
* settings for the easy breadcrumbs module so that paths in pathauto are automatically used as breadcrumbs.

### Manual Installation instructions

The recipe can be installed using these lando commands:

1. `lando composer require drupal/easy_breadcrumb:^2.0.3 drupal/pathauto:^1.11`
2. `lando install-recipe wunder_articles_section`
3. `lando drush cex -y` <- export your configuration
4. commit `composer.json`, `composer.lock` and the updated configuration.

### Testing on an empty site

(Caution, this command will re-install the site)

```shell
lando drush si -y && lando install-recipe wunder_articles_section && lando drush uli && lando drush cr
```
