# 🚀 Next.js for Drupal multilingual template by Wunder

This is a starter template created by [Wunder](https://www.wunder.io) for a decoupled website using the open-source [Next.js for Drupal](https://next-drupal.org/) project by [Chapter Three](https://www.chapterthree.com) and contributors.

## 🪂 Check out the running demo at https://next-drupal-starterkit.dev.wdr.io !

The aims of this template are:

- automating local environment set up as much as possible, lowering the effort needed to get the decoupled system working
- presenting simple solutions for the most common feature requests for a Drupal site
- focusing on the multilingual aspect which presents interesting challenges, and is a very common requirement in our projects.

Setting up [Next.js for Drupal](https://next-drupal.org/) normally requires various steps, in this template we have
automated them using a combination of environment variables and the upcoming [Distributions and Recipes](https://www.drupal.org/about/core/strategic-initiatives-distributions-and-recipes) initiative on the Drupal side.

The template includes all you need to have a working multi-language decoupled Drupal and Next.js site up and running in seconds, complete with demo content, an Elasticsearch-powered search interface, and more. Check the [what's included section ↘️](#-whats-included) for more details.

This example is meant to be used together with the [Silta](https://wunderio.github.io/silta/) hosting system by [Wunder](https://www.wunder.io), but it can be used with any hosting system.

## 🤓 The only requirement: local development with Lando

Local development is handled by [Lando](https://lando.dev/). Both frontend and backend are covered by the Lando setup, so that is the only real requirement. The frontend site can be run in either dev or prod mode,
and it will be proxied by Lando. The default URL for the frontend is [https://frontend.lndo.site](https://frontend.lndo.site), but it can be changed by editing the `.lando.yml` file.

### ⚠️⚠️ NOTE: Use npm inside Lando!

Instead of running npm operations in your host machine, _this template assumes you use npm inside Lando_: this ensures the same node version is used by all developers participating in the project, and also that the node process has the right environment variables to connect to the backend (these are defined in the `.lando.yml` file in the root of the project).

**Just prefix all npm operations with `lando`.**

So instead of `npm install`, run `lando npm install`, instead of `npm run dev` run `lando npm dev`, etc.

#### Stopping a running npm operation running inside the Lando node container

If you have closed the terminal window where you were running `lando npm`, or if the server was started with the "Quick one command setup" (see below), and you want to stop the running npm operation, you can use the specially created `lando npm-stop` command.

## 🤸 Getting started

Follow this guide to get the backend and frontend up and running. You can either do it all in one go, or step by step.

### 🏎️ Quick one command setup

If you are just testing for example for a pull request, and you want to get up and running quickly, you can issue this big command, go get a cup of coffee and come back to a working backend and frontend setup:

> NOTE: this will reinstall the site from scratch. Export your database if you have started working with the template, and you have something valuable in it. :)

```bash
lando rebuild -y && lando composer install && lando generate-oauth-keys && lando drush si minimal -y && lando install-recipe wunder_next_setup && lando drush wunder_next:setup-user-and-consumer && lando drush eshd -y && lando drush eshs && lando npm i && lando npm run build && (lando npm run start&) && lando drush en wunder_democontent -y && lando drush mim --group=demo_content --execute-dependencies && lando drush uli
```

You can then visit the site at https://frontend.lndo.site/.

## 🪜 Step-by-step setup

### Backend Drupal setup

All Drupal code and configuration is in the `drupal` directory.
All needed module dependencies have been added to the `composer.json` file.
Part of the setup process is automated using [Drupal recipes](https://www.drupal.org/project/distributions_recipes).
You will need to have a recent installation of [Lando](https://lando.dev/) running on your development machine.

Follow these steps to get started:

1. `lando start` (this will create the environment, and run `composer install` for you.)
2. Generate oauth keys using the command `lando generate-oauth-keys`. The keys will be created in the `drupal/oauth` directory.
3. Install Drupal as usual. Use the minimal installation profile. You can do it via the UI or using this command: `lando drush si minimal`.
4. Run the `lando install-recipe wunder_next_setup` command to set up all necessary modules, content types and configuration.
5. Run `lando drush eshs` to set up elasticsearch indexes.
6. Execute the command: `lando drush wunder_next:setup-user-and-consumer`
7. If you are starting your own project, and not just testing the template, you can now export your Drupal configuration the usual way: `lando drush cex`.

### Next.js setup

All Next.js code is in the `next` directory.

For frontend development, prefix npm commands with `lando`, so for example to start the
local node server in development mode, you can use `lando npm run dev`. All needed environment variables are already
set for backend and frontend in the Lando file, so you will not need to touch any .env files for the frontend to get up and running.

Follow these steps to get started, after you have set up the backend:

1. Run `lando npm install`
2. Run `lando npm run dev`
3. If you want to populate the backend site with the provided example content, you can now run: `lando drush en wunder_democontent && lando drush mim --group=demo_content --execute-dependencies`, otherwise you can log into the backend with `lando drush uli` and create some content.
4. Visit `https://frontend.lndo.site` and you should see your content displayed by the frontend.
5. When viewing a piece of content inside Drupal, you should be able to preview it in the frontend, including unpublished content and revisions.
6. The template includes automatic setup of [On demand revalidation](https://next-drupal.org/learn/on-demand-revalidation), so saving a piece of content will automatically revalidate the corresponding path in Next.js.

## 📦 What's included?

We try to add to the template what we think are the most commonly requested features in website projects. Most of these are based on the features provided by [Next.js for Drupal](https://next-drupal.org/), but we have paid special attention to making these work in a multilanguage setup.

### Preview mode

The template is set up to allow editors to use [Preview mode](https://next-drupal.org/docs/reference/preview). Visit the node page on the Drupal side while the frontend is running to see a preview of the page.

### On-demand revalidation

The template includes [On demand revalidation](https://next-drupal.org/learn/on-demand-revalidation), when saving or editing a piece of content the corresponding page in the frontend will be recreated. Because the frontpage in this example site includes a list of articles, the frontpage paths have been manually added to the configuration for the article content type.

### Metatag support

The template includes basic metatag support. Default metatag values are added to the frontend site's translation files, and content-based metatags are added to the Drupal backend using the [Metatag](https://www.drupal.org/project/metatag) module.
The Next.js site will then create the metatags using a combination of these two data sources.

### Search indexing and frontend search interface

The site is set up to work with Elasticsearch to provide a complete search experience.
The Lando setup includes spinning up an Elasticsearch instance with the required plugins. The content normalization and index handling is managed via the custom `wunder_search` module, which in turn makes use of the [Elasticsearch helper Drupal contrib module](https://www.drupal.org/project/elasticsearch_helper).
On the frontend side, the search user uses the [Elastic UI library](https://elastic.github.io/eui/).
The frontend site queries Elasticsearch via a simple proxy controller in Drupal, also provided by the included `wunder_search` custom Drupal module.

### Importable demo content

The template includes a Drupal migration to populate the site with a set of translated demo content and some test users. This includes paragraphs, images, videos, etc. Most of the content has been generated by AI.

### Multilanguage setup

This template is set up to use three languages: English (default), Finnish and Swedish. These languages are added in Drupal using the usual translation modules, and to the frontend using the [next-i18next](https://github.com/i18next/next-i18next) npm package.
The indexing in Elasticsearch takes into consideration the language of the content for analysis. The interface is translated. (Note: translations have mostly been done with Google Translate, so don't expect perfect Finnish or Swedish... or English for that matter. 🙂 )

### Webforms

The Drupal setup includes the popular [Webform](https://www.drupal.org/project/webform) module. The frontpage on the frontend displays a form that will post data back to Drupal's webform, with basic validation and a feedback message.
We decided to implement a static form, in the sense that the "hardcoded" fields in the frontend need to match the fields in the webform in the backend. Creating a dynamic system of forms that automatically match what's coming from the user-defined webforms in Drupal is out of scope for this template.

### Drupal Paragraphs (including nested paragraphs)

The `frontpage` and `page` content types are configured to use the popular [Paragraphs drupal module](https://www.drupal.org/project/paragraphs). The setup includes basic paragraph types to add images, videos, text, and also a nested paragraph type to demonstrate how to handle this in backend and frontend.

### Frontend user authentication and registration

The template includes the setup to allow users to log into the Drupal backend from the Next.js frontend, using [Next-Auth](https://next-auth.js.org/).

* As an example, only registered users are allowed to post to the drupal `contact` webform, and parts of the interface in the frontend are available only for logged-in users.
* Some test users are imported as part of the content migration (check the `users.csv' file for the credentials).
* New users can be created on the frontend using a simple registration form. Drupal will assign them the correct role, and will send them an email with the link to set their password.

### Typescript

The frontend uses [TypeScript](https://www.typescriptlang.org) to provide type safety.

TypeScript is setup quite loosely by default to minimise friction and make it accessible to developers who are not familiar with it. It is recommended to increase type safety by enabling some of the disabled rules in `next/eslint.json`.

#### Data fetching with TypeScript and Zod

[Zod](https://zod.dev) is also used on the frontend to type the data fetched from the backend. When it's necessary to change what data is fetched from the backend, check the following files:

- `next/lib/get-node-page-json-api-params.ts` - this file creates the parameters that are passed to JSON API when fetching page data.
- `next/lib/zod/*.ts` - these files contain the Zod schemas that are used to validate and cleanup the data fetched from the backend. Any data that is not accounted for in these schemas will be removed, in order to prevent sending more data than necessary to the client. During development, it can be handy to avoid this behaviour using [zod.passthrough()](https://zod.dev/?id=passthrough) to pass ALL data to the client, and then tighten the schema later to only pass the data that is actually needed.

#### Typesafe environment variables

The environment variables used by the frontend are also checked for type safety. If used correctly, a Zod error will prevent the frontend from building if the environment variables are not set according to the schema defined in `next/env.ts`. To add a new environment variable:

1. Add it to `.lando.yml`, under services > node > overrides > environment.
2. Add it to `next/env.ts`. Note that it must be added twice there - once under server/client to define its schema, and once under `runtimeEnv` to read the actual value.
3. Import it in the file where it's used with `import { env } from "@/env";` and use it like `env.MY_ENV_VAR`. At this point, your environment variable should be working locally.
4. To ensure it also works in CircleCI and Silta, also add it to`.circleci/config.yml` and `silta-next.yml`.

#### XML sitemap

The Drupal backend is responsible for generating the xml sitemap with the `simple_sitemap` module and exporting it to a file using a custom module. The frontend then reads this file and serves it at `/sitemap.xml` via proxying.

### Testing with Cypress

The template includes example tests to be run with Cypress. The Lando setup includes a headless browser and Cypress, so you can run the tests locally without the need to install anything else, but it won't be able to use the visual Cypress application. See below for more details.

#### Running tests locally inside Lando on the command line

To run the Cypress tests inside Lando: 

1. make sure the backend is running
2. run `lando npm run build` to build the frontend
3. run `lando npm run start` to start serving the frontend
4. open another terminal and run `lando npm run cypress:run` to start the Cypress test runner

A video of the run will be recorded, and it will be available at `next/cypress/videos`.

#### Using the Cypress application

If you want to run the visual Cypress application, you will need to run cypress outside of Lando, on your host computer. For this to work: 

1. ensure you are using the correct node version, matching what we use inside Lando (see the `.lando.yml` file for details)
2. ensure your machine has the correct dependencies installed (see the [Cypress docs](https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements) for details)
3. check which version of Cypress is specified in `next/package.json` and install the same version on your host computer globally with `npm install -g cypress@<version>`
4. while in the `/next` directory, run `npm run cypress:open` (notice that there's no `lando` at the beginning of the command).

You can then run your tests inside the Cypress application.

### UI library

The `ui/` directory contains some reusable UI components that are used in the frontend. These components are based on the [Wunder Component Library](https://www.figma.com/file/i0RIoStoPOZfcqS80DLbkD/The-Component-Library), which is a collection of reusable UI components designed to be used as a shared base for many projects. The components are meant to be used as a starting point, and should be modified, added and removed as required to fit the needs of the project.

## Updating Drupal core and modules

Drupal core is managed with [`drupal/core-recommended`](https://github.com/drupal/core-recommended), [`drupal/core-composer-scaffold`](https://github.com/drupal/core-composer-scaffold) and [`drupal/core-dev`](https://github.com/drupal/core-dev). Perform core updates by running following command:

```bash
lando composer update drupal/core-composer-scaffold drupal/core-recommended drupal/core-dev --with-dependencies
```

After updating core with composer run also updb and if there are database updates export them with the second command
```bash
lando drush updb
lando drush cex
```

Update separate modules by running the following command:
```bash
lando composer update 'drupal/twig_tweak' -W
```

And for major version updates:
```bash
lando composer require 'drupal/twig_tweak:^3.2' -W
```

### Things to consider when creating a project from this template

- When setting up this project in Silta, please check that the Elasticsearch image (in silta.yml) corresponds to the one being generated for your project.
- You should think about additional caching for the frontend. We have tested this template with Fastly CDN.
