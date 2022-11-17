### Wunder Languages recipe

This recipe adds basic language setup for the site.

When installed, this recipe will setup:

* the finnish and swedish language, in addition to the default english
* content translation
* configuration translation
* language selection with this logic:
  * English default language

### Manual Installation instructions

The recipe can be installed using these commands:

1. `lando install-recipe wunder_languages`
2. `lando drush cex -y` <- export your configuration
3. commit the configuration

### Testing on an empty site

(Caution, this command will re-install the site)

```shell
lando drush si -y && lando install-recipe wunder_wunder_languages
```
