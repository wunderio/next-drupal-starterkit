### Wunder Articles section example recipe

This recipe sets up the media functionality for a site.

When installed, this recipe will setup:

* basic media types (image, video, remote video, document, audio)
* set translation options for all media types
* set permissions to work with the created media types for the wunder_editor role.

> note: this requires to run against a site that has been installed using the default installation profile.

### Manual Installation instructions

The recipe can be installed using these lando commands:

1. `lando install-recipe wunder_media`
3. `lando drush cex -y` <- export your configuration
4. commit the updated configuration.

### Testing on an empty site

(Caution, this command will re-install the site)

```shell
lando drush si -y && lando install-recipe wunder_media && lando drush uli
```
