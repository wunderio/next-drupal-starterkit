## Next.js for Drupal wunder template

(WORK IN PROGRESS)

This is a starter template for a decoupled website using [Next.js for Drupal](https://next-drupal.org/). It includes 
the codebase for the drupal backend and the corresponding next.js frontend.

### Getting started

Follow this guide to get backend and frontend up and running.

#### Drupal setup

All drupal code and configuration is in the `drupal` directory.
All needed module dependencies have been added to the `composer.json` file.
Some of the setup process is automated using [drupal recipes](https://www.drupal.org/project/distributions_recipes).

Follow these steps to get started:

1. `cd drupal`
2. `lando start`
3. `lando composer install`
4. generate oauth keys using the command `lando generate-oauth-keys`. The keys will be created in the `drupal/oauth` directory.
5. Install Drupal as usual. Use the standard installation profile. You can do it via the UI or using this command: `lando drush si --site-name="My great site neame here"
6. Run the `lando install-recipe wunder_next_setup` command to set up the `next` drupal module
7. Run the `lando install-recipe wunder_languages` command to set up the basic languages. 
8. Execute the command: `lando drush wunder_translations:translate-content`
9. You can now export your configuration.
10. Create some content and translate it :-)

#### Next.js setup

All next.js code  is in the `next` directory.

Follow these steps to get started:

1. start in the `drupal` directory, and execute the command: `lando drush wunder_next:setup-user-and-consumer`
2. `cd ../next`
3. `cp .env.example .env.local`
4. add the output of the command in step 1 to your `.env.local` file and save it.
5. `npm install`
6. `npm run dev`
7. visit `localhost:3000` and you should see your content displayed by the frontend.
8. when viewing a piece of content inside Drupal, you should be able to preview it in the frontend, including unpublished content and revisions.

> NOTE: If you get a `https://next4drupal-project.lndo.site/jsonapi failed, reason: unable to verify the first certificate`,
decomment the `NODE_TLS_REJECT_UNAUTHORIZED=0` line in .env.local