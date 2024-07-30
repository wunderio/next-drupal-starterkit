import "../styles/globals.css";

import React, { useEffect } from "react";
import { type Preview, type StoryFn } from "@storybook/react";
import { I18nextProvider } from "react-i18next";

import i18n from "./i18n";
import siteConfig from "../site.config";

/** Adapted from https://storybook.js.org/recipes/react-i18next */
const withI18next = (Story, context) => {
  const { locale } = context.globals;

  // When the locale global changes, set the new locale in i18n
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <I18nextProvider i18n={i18n}>
      <Story />
    </I18nextProvider>
  );
};

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    i18n,
  },
  globalTypes: {
    locale: {
      name: "Locale",
      description: "Internationalization locale",
      toolbar: {
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fi", title: "Suomi" },
          { value: "sv", title: "Svenska" },
        ],
        showName: true,
      },
    },
  },
  globals: {
    locale: siteConfig.defaultLocale,
    locales: Object.entries(siteConfig.locales).reduce(
      (acc, [key, { name }]) => {
        acc[key] = name;
        return acc;
      },
      {},
    ),
  },
  decorators: [withI18next],
};

export default preview;
