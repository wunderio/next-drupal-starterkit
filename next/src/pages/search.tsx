import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import {
  ErrorBoundary,
  Facet,
  PagingInfo,
  Results,
  SearchBox,
  SearchProvider,
  WithSearch,
} from "@elastic/react-search-ui";
import { SearchDriverOptions } from "@elastic/search-ui";

import { HeadingPage } from "@/components/heading--page";
import { Meta } from "@/components/meta";
import { SearchBoxInput } from "@/components/search/search-box-input";
import { MultiCheckboxFacet } from "@/components/search/search-multicheckbox-facet";
import { Pagination } from "@/components/search/search-pagination";
import { PagingInfoView } from "@/components/search/search-paging-info";
import { SearchResult } from "@/components/search/search-result";
import {
  CommonPageProps,
  getCommonPageProps,
} from "@/lib/get-common-page-props";
import { buildRequest } from "@/lib/search-ui-helpers/buildRequest";
import { buildState } from "@/lib/search-ui-helpers/buildState";
import { runRequest } from "@/lib/search-ui-helpers/runRequest";
import { useNextRouting } from "@/lib/search-ui-helpers/useNextRouting";

export default function SearchPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const config: SearchDriverOptions = {
    debug: false,
    hasA11yNotifications: true,
    apiConnector: null,
    onSearch: async (state) => {
      const { resultsPerPage } = state;
      const requestBody = buildRequest(state);
      const responseJson = await runRequest(requestBody, router.locale);
      return buildState(responseJson, resultsPerPage, state);
    },
  };

  // useNextRouting is a custom hook that will integrate with Next Router with Search UI config
  // config is search-ui configuration.
  // baseUrl is the path to the search page
  const combinedConfig = useNextRouting(config, `/${router.locale}/search`);

  return (
    <>
      <Meta title={t("search")} metatags={[]} />

      <HeadingPage>{t("search")}</HeadingPage>

      <SearchProvider config={combinedConfig}>
        <WithSearch
          mapContextToProps={({ wasSearched, results }) => ({
            wasSearched,
            results,
          })}
        >
          {({ wasSearched, results }) => (
            <ErrorBoundary>
              <SearchBox
                searchAsYouType={false}
                shouldClearFilters={false}
                // Here we specify our own custom
                // component to render the search bar:
                inputView={SearchBoxInput}
                className="my-8 rounded bg-primary-100 sm:my-16 sm:py-16"
              />
              <div className="flex justify-end">
                {wasSearched && results.length > 0 && (
                  <PagingInfo view={PagingInfoView} />
                )}
              </div>
              <div className="flex flex-col md:flex-row">
                <aside className="mr-2 w-56">
                  {wasSearched && results.length > 0 && (
                    <div className="py-2" aria-label={t("filter-search")}>
                      <Facet
                        view={MultiCheckboxFacet}
                        field="tags"
                        label={t("tags")}
                      />
                      <Facet
                        view={MultiCheckboxFacet}
                        field="content_type"
                        label={t("content-type")}
                      />
                    </div>
                  )}
                </aside>

                <div className="flex-1">
                  <Results
                    shouldTrackClickThrough={false}
                    resultView={SearchResult}
                  />
                  <div className="flex items-center justify-center py-2">
                    {wasSearched && results.length > 0 && <Pagination />}
                  </div>
                </div>
              </div>
              {wasSearched && results.length === 0 && (
                <div>{t("no-results-found")}</div>
              )}
            </ErrorBoundary>
          )}
        </WithSearch>
      </SearchProvider>
    </>
  );
}

export const getStaticProps: GetStaticProps<CommonPageProps> = async (
  context,
) => {
  return {
    props: {
      ...(await getCommonPageProps(context)),
    },
    revalidate: 60,
  };
};
