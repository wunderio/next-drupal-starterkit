import "styles/globals.css";

import { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

const App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default appWithTranslation(App);
