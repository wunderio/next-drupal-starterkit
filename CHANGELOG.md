# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## [2.5.0] 10.6.2024
 
- Add DDEV support
- Drupal 10.2.6 and Drush 1.5.2
- Update the graphql_compose module to 2.1.0
- Add a paragraph to display an arbitrary list of articles
- Update npm dependencies
- Run graphql-codegen with build/dev scripts, rather than committing the result

## [2.4.0] 22.5.2024

- Add separate consumer for previewing, prevent anonymous access to the GraphQL endpoint
- Add authentication to grapqhl-codegen npm operations

## [2.3.0] 18.5.2024

- Override the next.js dependency for next-drupal to be the same as in package.json
- Prevent the Drupal backend from being indexed by search engines
- Return permanent or temporary redirect based on the redirect status code set on the Drupal side
- Move the generation of sitemap.xml to the frontend
- Support rendering nodes that are not set up to be translatable
- Use the new Translations GraphQL field to get translated versions of the node
- TypeScript: Enable noErrorTruncation in TS config

## [2.2.0] 25.4.2024

- Update Drupal to 10.2.5 and contrib modules to their latest versions
- Update Next.js to 14.2.2
- Use the new Translations GraphQL field to get translated versions of the node
- Enable noErrorTruncation in TypeScript
- Replace kibana with Elasticvue in Lando
- If a catch-all route loads a frontpage node, redirect to / in the correct locale
- Add mechanism to inhibit revalidation (used during migration of default content)
- Add retry functionality for failed requests to the backend
- Switch to standalone Next.js build in CI

## [2.1.0] 08.3.2024

- Update Drupal core to 10.2.4 and contrib modules to latest versions
- Added patch for paragraphs module to fix ui bug when translating paragraphs
- Update to node 20, cypress 13 and other dependencies
- Update to lando > 3.21
- Bump jose from 4.15.4 to 4.15.5
- Fix issue with generated paths for static pages having the language path twice

## [2.0.1] 10.2.2024

### Changed

- Updated Drupal core to 10.1.8 and contrib modules to latest versions
- Updated the graphql_compose module to 2.1 beta1
- Switched the graphql schema to use Drupal entity ids instead of UUIDs, to fix rendering of nodes at specific revisions.

## [2.0.0] 9.2.2024

This release is a major update. Instead of using JSONAPI, the starterkit now uses GraphQL to fetch data from Drupal.
All features are kept but have been re-implemented to use the new way of handling data coming from the backend.

### Added

- GraphQL Drupal modules and related configuration
- `graphql-request` for fetching data from Drupal
- `graphql-codegen` for generating types from GraphQL schema, queries and fragments

### Removed

- JSONAPI modules and related configuration
- Manual definitions in `zod` for JSONAPI responses

### Changed

- Reorganization of the components directory structure
- Updated Readme with new instructions regarding GraphQL setup

## [1.0.0] - 09.02.2024

The starterkit provides a basic setup for a new project using next-drupal to build a decoupled Drupal frontend with Next.js.

At this point, the starterkit includes the following features:

- Automated setup with Drupal recipes and Lando
- Integration with Wunder's Silta hosting setup
- Content types
  - Frontpage
  - Article
  - Page
- Paragraph types
  - Text
  - Image
  - Video
  - Accordion (with nested paragraphs)
  - Articles listing
  - Hero
- Data fetching from the frontend to the backend via JSONAPI
- Schema definition with Zod
- Basic styling with Tailwind CSS
- Basic SEO setup with Next.js
- Example of integration with Drupal's webform module
- Authentication with next-auth, user registration and change password
- Ready integration with Elasticsearch (indexing and front page for results)
- Preview mode and on-demand regeneration of static pages
- Metatags support
- Importable demo content
- Multilingual support (included English, Finnish and Swedish)
- Typesafe environment variables with Zod
- Xml sitemap
- basic Cypress testing setup
- initial UI library of components
- integration with Storybook
