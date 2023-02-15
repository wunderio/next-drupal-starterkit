## Next.js for Drupal template by Wunder

This is a starter template for a decoupled website using the open-source [Next.js for Drupal](https://next-drupal.org/) 
by [Chapter Three](https://www.chapterthree.com) and contributors.

It includes the codebase for both the Drupal backend and the corresponding Next.js frontend. 
Some example content types and languages are included in the configuration to provide a working multilingual example out of the box, using the upcoming
[Distributions and Recipes](https://www.drupal.org/about/core/strategic-initiatives-distributions-and-recipes) Drupal core initiative.

This example is meant to be used together with the [Silta](https://wunderio.github.io/silta/) hosting system by [Wunder](https://www.wunder.io), but it can be used with any hosting system.

### Lando setup

Local development is handled by [Lando](https://lando.dev/). Both frontend and backend are covered by the Lando setup,
so that is the only real requirement. The frontend site can be run in either dev or prod mode, 
and it will be proxied by lando at the configured url in lando. The default is [https://frontend.lndo.site](https://frontend.lndo.site)"

### Getting started

Follow this guide to get backend and frontend up and running. You can either do it all in one go, or step by steo

### Quick one command setup

If you are just testing for example for a pull request, and you want to get up and running quickly, you can issue this big command, go get a cup of coffee and come back to a working backend and frontend setup:

> NOTE: this will reinstall the site from scratch, export your database if you have something valuable in it. :)

```
lando rebuild -y && lando composer install && lando generate-oauth-keys && lando drush si --site-name="My great site name here" -y && lando install-recipe wunder_next_setup && lando drush wunder_next:setup-user-and-consumer && lando drush eshd -y && lando drush eshs && lando npm i && lando npm run build && (lando npm run start&) && lando drush en wunder_democontent -y && lando drush mim --group=demo_content --execute-dependencies
```

You can then visit the site at https://frontend.lndo.site/.

### Step-by-step setup

#### Drupal setup

All drupal code and configuration is in the `drupal` directory.
All needed module dependencies have been added to the `composer.json` file.
Part of the setup process is automated using [drupal recipes](https://www.drupal.org/project/distributions_recipes).

Follow these steps to get started:

1. `lando start`
2. `lando composer install`
3. Generate oauth keys using the command `lando generate-oauth-keys`. The keys will be created in the `drupal/oauth` directory.
4. Install Drupal as usual. Use the standard installation profile. You can do it via the UI or using this command: `lando drush si --site-name="My great site name here"`.
5. Run the `lando install-recipe wunder_next_setup` command to set up all necessary modules, content types and configuration.
6. Run `lando drush eshs` to set up elasticsearch indexes.
7. Execute the command: `lando drush wunder_next:setup-user-and-consumer`
8. If you are starting your own project, and not just testing the template, you can now export your drupal configuration the usual way: `lando drush cex`.

#### Next.js setup

All next.js code  is in the `next` directory.

For frontend development, prefix npm commands with `lando`, so for example to start the
local node server in development mode, you can use `lando npm run dev`. All needed environment variables are already
set for backend and frontend in the lando file, so you will not need to touch .env files for the frontend.

Follow these steps to get started:

1. Run `lando npm install`
2. Run `lando npm run dev`
3. If you want to populate the backend site with the provided example content, you can now run: `lando drush en wunder_democontent && lando drush mim --group=demo_content --execute-dependencies`,  otherwise you can log into the backend with `lando drush uli` and create some content.
4. Visit `https://frontend.lndo.site` and you should see your content displayed by the frontend.
5. When viewing a piece of content inside Drupal, you should be able to preview it in the frontend, including unpublished content and revisions.
6. The template includes automatic setup of [On demand revalidation](https://next-drupal.org/learn/on-demand-revalidation), so saving a piece of content will automatically revalidate the corresponding path in next.js.