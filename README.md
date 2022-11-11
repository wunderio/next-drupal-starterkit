## Next.js for Drupal wunder template

(WORK IN PROGRESS)

This repository includes a starter template to create a drupal-next site. Both front and back end are included.

### Getting started

Follow this guide to get backend and frontend up and running, showing a basic site.

#### Drupal setup

All drupal code and configuration is in the `drupal` directory.
All needed module dependencies have been added to the `composer.json` file.
Some of the setup process is automated using [drupal recipes](https://www.drupal.org/project/distributions_recipes).

1. `cd drupal`
2. `lando start`
3. `lando composer install`
4. Install Drupal as usual. Use the standard installation profile. You can do it via the UI or using this command: `lando drush si --site-name="My great site neame here"
5. Configure the next drupal module by issuing the command:  `lando install-recipe wunder_next_step`
6. You can now export your configuration.
7. Create some content :-)

#### Next.js setup

All next.js code  is in the `next` directory.
All needed module dependencies have been added to the `composer.json` file.
Some of the setup process is automated using [drupal recipes](https://www.drupal.org/project/distributions_recipes).

1. `cd next`
2. `npm install` (you should use node 16)
3. `cp .env.example .env.local`
4. `npm run dev`

5. visit `localhost:3000` and you should see your content displayed by the frontend.
> If you get a `https://next4drupal-project.lndo.site/jsonapi failed, reason: unable to verify the first certificate`,
  decomment the `NODE_TLS_REJECT_UNAUTHORIZED=0` line in .env.local