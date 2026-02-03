# Wunder template for Next4Drupal projects

This project template is an opinionated fork of the popular [Drupal-composer template](https://github.com/drupal-composer/drupal-project), configured to automatically deploy code to a [Kubernetes](https://kubernetes.io/) cluster using [CircleCI](https://circleci.com/). Everything that works with the Drupal-composer project template will work with this repository, so we won't duplicate the documentation here.

## Getting started

- Click "[Use this template](https://github.com/wunderio/drupal-project/generate)" to generate a new project,
  - select the correct owner,
  - name the project as `client-COUNTRYCODE-CLIENT-PROJECT`,
  - make the repository private (unless the project is public).
- Clone the new project locally and modify it's details:
  - `composer.json` name,
  - `silta/silta.yml` [values](https://github.com/wunderio/charts/blob/master/drupal/values.yaml).
- Log in to [CircleCI](https://app.circleci.com/) using your Github account and add the new project using existing config.

For additional instructions, please see the [Silta documentation](https://github.com/wunderio/silta).

## Main environment

- URL: <https://main.drupal-project.dev.wdr.io>
- Drush alias: `drush @main st`
- SSH: `ssh www-admin@main-shell.drupal-project -J www-admin@ssh.dev.wdr.io`

Drush alias for **current** Silta feature branch deployment is `drush @current st`.

## Local environment

- Appserver: <https://drupal-project.ddev.site>
- Elasticsearch: <http://localhost:9200>, <http://elasticsearch.ddev.site>
- Kibana: <http://localhost:5601>, <http://kibana.ddev.site>
- Mailpit: <http://mail.ddev.site>
- Drush alias: `ddev drush @local st`
- SSH: `ddev ssh (-s <service>)`

### [Setup](https://docs.ddev.com/en/stable/users/install/ddev-installation/)

1. Install the latest [DDEV](https://docs.ddev.com/en/stable/users/install/ddev-installation/) and read the [documentation](https://docs.ddev.com/en/stable/).
2. Update your project name and other DDEV's parameters at `.ddev/config.yaml`.
3. Run `ddev start`.

### [Commands](https://docs.ddev.com/en/stable/users/usage/commands/)

- `ddev` - commands overview.
- `ddev grumphp <commands>` - run [GrumPHP](https://github.com/phpro/grumphp) code quality checks. Modified or new files are checked on git commit, see more at `ddev grumphp -h` or [wunderio/code-quality](https://github.com/wunderio/code-quality).
- `ddev npm <commands>` - run [npm](https://www.npmjs.com/) commands.
- `ddev phpunit <commands>` - run [PHPUnit](https://phpunit.de/) commands.
- `ddev xdebug <mode>` - load [Xdebug](https://xdebug.org/) in the selected [mode(s)](https://xdebug.org/docs/all_settings#mode).

### Drupal development hints

- [Updating Drupal core](https://www.drupal.org/docs/8/update/update-core-via-composer).
- [Altering scaffold files](https://www.drupal.org/docs/develop/using-composer/using-drupals-composer-scaffold#toc_4) (`robots.txt`, `.htaccess` etc.).

### Running tests

The [PHPUnit](https://phpunit.de/) test framework is predefined in this project, see `phpunit.xml` for details. Also, there is a minified `web/modules/custom/phpunit_example` module included from [examples module](https://www.drupal.org/project/examples) for learning purposes.

#### Testing examples

Use `ddev phpunit` to run the PHPUnit commands.

- run one test class: `ddev phpunit path/to/your/class/file.php`,
- list groups: `ddev phpunit --list-groups`,
- run all the tests in a particular group: `ddev phpunit --group Groupname`.
