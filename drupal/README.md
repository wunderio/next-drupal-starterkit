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

- Appserver: <https://drupal-project.lndo.site>
- Elasticsearch: <http://localhost:9200>, <http://elasticsearch.lndo.site>
- Kibana: <http://localhost:5601>, <http://kibana.lndo.site>
- Mailhog: <http://mail.lndo.site>
- Drush alias: `lando drush @local st`
- SSH: `lando ssh (-s <service>)`

### [Setup](https://docs.lando.dev/basics/installation.html)

1. Install the latest [Lando](https://github.com/lando/lando/releases) and read the [documentation](https://docs.lando.dev/).
2. Update your project name and other Lando [Drupal 9 recipe](https://docs.lando.dev/config/drupal9.html)'s parameters at `.lando.yml`.
3. Run `lando start`.

### [Services](https://docs.lando.dev/config/services.html)

- `chrome` - uses [selenium/standalone-chrome](https://hub.docker.com/r/selenium/standalone-chrome/) image, uncomment the service definition at `.lando.yml` to enable.
- `elasticsearch` - uses official [Elasticsearch image](https://hub.docker.com/r/elastic/elasticsearch), uncomment the service definition at `.lando.yml` to enable. Requires [at least 4GiB of memory](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html).
- `kibana` - uses official [Kibana image](https://hub.docker.com/r/elastic/kibana), uncomment the service definition at `.lando.yml` to enable.
- `mailhog` - uses Lando [MailHog service](https://docs.lando.dev/config/mailhog.html).
- `node` - uses Lando [Node service](https://docs.lando.dev/config/node.html).

### [Tools](https://docs.lando.dev/config/tooling.html)

- `lando` - tools / commands overview.
- `lando grumphp <commands>` - run [GrumPHP](https://github.com/phpro/grumphp) code quality checks. Modified or new files are checked on git commit, see more at `lando grumphp -h` or [wunderio/code-quality](https://github.com/wunderio/code-quality).
- `lando npm <commands>` - run [npm](https://www.npmjs.com/) commands.
- `lando phpunit <commands>` - run [PHPUnit](https://phpunit.de/) commands.
- `lando xdebug <mode>` - load [Xdebug](https://xdebug.org/) in the selected [mode(s)](https://xdebug.org/docs/all_settings#mode).

### Drupal development hints

- [Updating Drupal core](https://www.drupal.org/docs/8/update/update-core-via-composer).
- [Altering scaffold files](https://www.drupal.org/docs/develop/using-composer/using-drupals-composer-scaffold#toc_4) (`robots.txt`, `.htaccess` etc.).

### Running tests

The [PHPUnit](https://phpunit.de/) test framework is predefined in this project, see `phpunit.xml` for details. Also, there is a minified `web/modules/custom/phpunit_example` module included from [examples module](https://www.drupal.org/project/examples) for learning purposes.

#### Testing examples

Use `lando phpunit` to run the PHPUnit commands.

- run one test class: `lando phpunit path/to/your/class/file.php`,
- list groups: `lando phpunit --list-groups`,
- run all the tests in a particular group: `lando phpunit --group Groupname`.
