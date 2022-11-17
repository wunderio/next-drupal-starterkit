import React from "react";

import { NodeArticle } from "../../components/node--article";
import { NodeArticleTeaser } from "../../components/node--article--teaser";

export default {
  title: "Pages/Article",
  component: NodeArticle,
};

const node = {
  type: "node--article",
  id: "d2eea145-d709-4aa7-a223-3d01668660a7",
  path: { alias: "/blog/test", pid: 1, langcode: "en" },
  title: "test",
  created: "2022-11-10T10:01:19+00:00",
  links: {
    self: {
      href: "https://next4drupal-project.lndo.site/jsonapi/node/article/d2eea145-d709-4aa7-a223-3d01668660a7?resourceVersion=id%3A3",
    },
  },
  uid: {
    type: "user--user",
    id: "2e95f2d9-b40d-4392-8608-e29f0bd750b3",
    display_name: "admin",
    links: { self: [{}] },
    resourceIdObjMeta: { drupal_internal__target_id: 1 },
  },
  field_image: null,
  relationshipNames: ["uid", "field_image"],
};

const Template = (args) => <NodeArticle {...args} />;

const TemplateArticleTeaser = (args) => <NodeArticleTeaser {...args} />;

export const ArticlePage = Template.bind({});
ArticlePage.args = {
  node: node,
};

export const ArticlePageTeaser = TemplateArticleTeaser.bind({});
ArticlePageTeaser.args = {
  node: node,
};
