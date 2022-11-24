### Wunder Articles section example recipe

This recipe is an example of installing and configuring a recipe.

When installed, this recipe will create:

* a "wunder content editor" role with some basic administrative permissions.

### Manual Installation instructions

The recipe can be installed using these commands:

1. `lando install-recipe wunder_roles`
2. `lando drush cex -y` <- export your configuration
3. commit the configuration

### Testing on an empty site

(Caution, this command will re-install the site)

```shell
lando drush si -y && lando install-recipe wunder_roles && lando  drush user:create testuser --mail="person@example.com" --password="letmein" && lando drush user:role:add wunder_content_editor testuser && lando drush uli --name testuser
```
