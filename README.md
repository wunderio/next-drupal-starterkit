## 🚀 Next.js for Drupal template by Wunder

This is a starter template for a decoupled website using the open-source [Next.js for Drupal](https://next-drupal.org/)
by [Chapter Three](https://www.chapterthree.com) and contributors.

The aims of this template are:

- automating local environment set up as much as possible, lowering the effort needed to get the decoupled system working
- presenting simple solutions for the most common feature requests for a Drupal site
- focusing on the multilingual aspect which presents interesting challenges, and is a very common requirements in our projects.

Setting up [Next.js for Drupal](https://next-drupal.org/) normally requires various steps, in this template we have
automated them using a combination of environment variables and the upcoming
[Distributions and Recipes](https://www.drupal.org/about/core/strategic-initiatives-distributions-and-recipes) initiative
on the drupal side.

The template includes all you need to have a working multi-language decoupled Drupal and Next.js site up and running in seconds,
complete with demo content, an Elasticsearch-powered search interface, and more. Check the [What's included](#-whats-included) section below for more details.

This example is meant to be used together with the [Silta](https://wunderio.github.io/silta/) hosting system by [Wunder](https://www.wunder.io), but it can be used with any hosting system.

### Lando for local development

Local development is handled by [Lando](https://lando.dev/). Both frontend and backend are covered by the Lando setup,
so that is the only real requirement. The frontend site can be run in either dev or prod mode,
and it will be proxied by lando. The default url for the frontend is [https://frontend.lndo.site](https://frontend.lndo.site)"

#### ⚠️ NOTE: Use npm inside lando!

Instead of running npm operations in your host machine, _this template assumes you use npm inside Lando_: this ensures
the same node version is used by all developers participating in the project, and also that the node process has the
right environment variables to connect to the backend (these are defined in the `.lando.yml` file in the root of the project).

Just prefix all npm operations with `lando`.

So instead of `npm install`, run `lando npm install`, instead of `npm run dev` run `lando npm dev`, etc.

##### Stopping a running npm operation running inside the Lando node container

If you have closed the terminal window where you were running `lando npm`, or if the server was started with the "Quick one command setup" (see below), and you want
to stop the running npm operation, you can use the specially created `lando npm-stop` command.

### Getting started

Follow this guide to get backend and frontend up and running. You can either do it all in one go, or step by step.

### 🚤 Quick one command setup

If you are just testing for example for a pull request, and you want to get up and running quickly, you can issue this big command, go get a cup of coffee and come back to a working backend and frontend setup:

> NOTE: this will reinstall the site from scratch, export your database if you have started working with the template, and you have something valuable in it. :)

```
lando rebuild -y && lando composer install && lando generate-oauth-keys && lando drush si minimal -y && lando install-recipe wunder_next_setup && lando drush wunder_next:setup-user-and-consumer && lando drush eshd -y && lando drush eshs && lando npm i && lando npm run build && (lando npm run start&) && lando drush en wunder_democontent -y && lando drush mim --group=demo_content --execute-dependencies && lando drush uli
```

You can then visit the site at https://frontend.lndo.site/.

### 🪜 Step-by-step setup

#### Backend Drupal setup

All drupal code and configuration is in the `drupal` directory.
All needed module dependencies have been added to the `composer.json` file.
Part of the setup process is automated using [drupal recipes](https://www.drupal.org/project/distributions_recipes).

Follow these steps to get started:

1. `lando start` (this will create the environment, and run `composer install` for you.)
2. Generate oauth keys using the command `lando generate-oauth-keys`. The keys will be created in the `drupal/oauth` directory.
3. Install Drupal as usual. Use the standard installation profile. You can do it via the UI or using this command: `lando drush si minimal`.
4. Run the `lando install-recipe wunder_next_setup` command to set up all necessary modules, content types and configuration.
5. Run `lando drush eshs` to set up elasticsearch indexes.
6. Execute the command: `lando drush wunder_next:setup-user-and-consumer`
7. If you are starting your own project, and not just testing the template, you can now export your drupal configuration the usual way: `lando drush cex`.

#### Next.js setup

All Next.js code is in the `next` directory.

For frontend development, prefix npm commands with `lando`, so for example to start the
local node server in development mode, you can use `lando npm run dev`. All needed environment variables are already
set for backend and frontend in the Lando file, so you will not need to touch .env files for the frontend.

Follow these steps to get started, after you have set up the backend:

1. Run `lando npm install`
2. Run `lando npm run dev`
3. If you want to populate the backend site with the provided example content, you can now run: `lando drush en wunder_democontent && lando drush mim --group=demo_content --execute-dependencies`, otherwise you can log into the backend with `lando drush uli` and create some content.
4. Visit `https://frontend.lndo.site` and you should see your content displayed by the frontend.
5. When viewing a piece of content inside Drupal, you should be able to preview it in the frontend, including unpublished content and revisions.
6. The template includes automatic setup of [On demand revalidation](https://next-drupal.org/learn/on-demand-revalidation), so saving a piece of content will automatically revalidate the corresponding path in Next.js.

## 📦 What's included?

We try to add to the template what we think are the most common requested features in website project. Most of these are based on the features provided by [Next.js for Drupal](https://next-drupal.org/), but we have paid
special attention on making these work in a multilanguage setup.

### Preview mode

The template is set up to allow editors to use [Preview mode](https://next-drupal.org/docs/reference/preview). Visit the node page on the Drupal side while the frontend is running to see a preview of the page.

### On-demand revalidation

The template includes [On demand revalidation](https://next-drupal.org/learn/on-demand-revalidation), when saving or editing a piece of content the corresponding page in the
frontend will be recreated. Because the frontpage includes a list of articles, the frontpage paths have been manually added to the configuration for the article content type.

### Metatag support

The template includes basic metatag support. Default metatag values are added to the frontend site's translation files, and content based metatags are added to the Drupal backend using the [Metatag](https://www.drupal.org/project/metatag) module.
The Next.js site will then create the metatags using a combination of these two data sources.

### Search indexing and frontend search interface

The site is set up to work with Elasticsearch to provide a complete search experience.
The lando setup includes spinning up an Elasticsearch instance with the required plugins. The content normalization and index handling is managed via the custom `wunder_search` module,
which in turn makes use of the [Elasticsearch helper Drupal contrib module](https://www.drupal.org/project/elasticsearch_helper).
On the frontend side, the search user interface is created using the [Elastic UI library](https://elastic.github.io/eui/).
The frontend queries Elasticsearch via a simple proxy controller in Drupal, also provided by the `wunder_search` custom module.

### Importable demo content

The template includes a Drupal migration to populate the site with a set of translated demo content. This includes paragraphs, images, videos, etc. Most of the content has been generated by AI.

### Multilanguage setup

This template is set up to use three languages: English (default), Finnish and Swedish. These languages are added in Drupal using the usual translation modules, and to the frontend using the [next-i18next](https://github.com/i18next/next-i18next) npm package.
The indexing in elasticsearch takes into consideration the language for analysis. The interface is translated. (Note: translations have been done with Google Translate, so don't expect perfect Finnish or Swedish... or English for that matter. 🙂 )

### Typescript

The frontend site uses typescript.
