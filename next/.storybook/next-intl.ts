import en from "../messages/en.json";
import fi from "../messages/fi.json";
import sv from "../messages/sv.json";

const messagesByLocale: Record<string, any> = { en, fi, sv };

const nextIntl = {
  defaultLocale: "en",
  messagesByLocale,
};

export default nextIntl;
