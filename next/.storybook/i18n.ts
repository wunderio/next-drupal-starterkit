import i18n from "i18next";
import Backend, { type HttpBackendOptions } from "i18next-http-backend";

import i18nConfig from "../next-i18next.config";

i18n.use(Backend).init<HttpBackendOptions>({
  ...i18nConfig.i18n,
  ...i18nConfig,
});

export default i18n;
