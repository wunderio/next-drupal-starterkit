import { useRouter } from "next/router";
import { useMemo } from "react";

export const useNextRouting = (config, basePathUrl) => {
  const router = useRouter();
  const { asPath } = router;

  const getSearchParamsFromUrl = (url) => {
    return url.match(/\?(.+)/)?.[1] || "";
  };

  const routingOptions = {
    // read and write only the query string to search UI
    // as we are leveraging existing stateToUrl and urlToState functions
    // which are based on the query string
    readUrl: () => {
      return getSearchParamsFromUrl(asPath);
    },
    writeUrl: (url, { replaceUrl }) => {
      const method = router[replaceUrl ? "replace" : "push"];
      const params = Object.fromEntries(new URLSearchParams(url).entries());
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      method({ query: { ...router.query, ...params } }, undefined, {
        shallow: true,
      });
    },
    routeChangeHandler: (callback) => {
      const handler = (fullUrl) => {
        if (fullUrl.includes(basePathUrl)) {
          callback(getSearchParamsFromUrl(fullUrl));
        }
      };
      router.events.on("routeChangeComplete", handler);
      return () => {
        router.events.off("routeChangeComplete", handler);
      };
    },
  };

  return useMemo(() => {
    return {
      ...config,
      routingOptions,
    };
  }, [router.isReady]); // eslint-disable-line react-hooks/exhaustive-deps
};
