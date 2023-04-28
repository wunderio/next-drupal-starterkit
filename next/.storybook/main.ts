import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-react-i18next",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    config.module!.rules = [
      ...config.module!.rules!.map((rule) => {
        // @ts-ignore
        // Remove existing Storybook loaders for SVG files:
        if (/svg/.test(rule.test)) {
          // @ts-ignore
          return { ...rule, exclude: /\.svg$/i };
        }
        return rule;
      }),
      // Use @svgr to load SVG files as React components:
      {
        test: /\.svg$/i,
        issuer: /\.tsx$/i,
        loader: "@svgr/webpack",
      },
    ];

    // Since storybook does not need SSR, alias next-i18next to react-i18next:
    config.resolve!.alias = {
      ...config.resolve!.alias,
      "next-i18next": "react-i18next",
    };

    // Return the altered config
    return config;
  },
};

export default config;
