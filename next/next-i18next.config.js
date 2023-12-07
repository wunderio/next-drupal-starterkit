const config = require("./src/site.config");

module.exports = {
  i18n: {
    defaultLocale: config.defaultLocale,
    locales: Object.keys(config.locales),
  },
};
