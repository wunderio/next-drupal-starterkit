### Wunder base setup recipe

This recipe is meant as a replacement of the default installation profile, and it provides a subset
of its functionality.

### Manual Installation instructions

The recipe can be installed using these commands:

1. `lando install-recipe wunder_base`
2. `lando drush cex -y` <- export your configuration
3. commit the configuration

### Testing on an empty site

(Caution, this command will re-install the site)

```shell
lando drush si -y && lando install-recipe wunder_base && lando drush uli
```
