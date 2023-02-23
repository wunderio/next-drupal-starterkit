import "@elastic/react-search-ui-views/lib/styles/styles.css";

import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import {
  ErrorBoundary,
  Facet,
  Paging,
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
import { PagingInfoView } from "@/components/search/search-paging-info";
import { SearchResult } from "@/components/search/search-result";
import {
  CommonPageProps,
  getCommonPageProps,
} from "@/lib/get-common-page-props";
import { buildRequest } from "@/lib/search-ui-helpers/buildRequest";
import { buildState } from "@/lib/search-ui-helpers/buildState";
import { runRequest } from "@/lib/search-ui-helpers/runRequest";

/**
 * Contains the search provider component.
 */
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

  return (
    <>
      <Meta title={t("search")} metatags={[]} />

      <HeadingPage>{t("search")}</HeadingPage>

      <SearchProvider config={config}>
        <WithSearch
          mapContextToProps={({ wasSearched, results }) => ({
            wasSearched,
            results,
          })}
        >
          {({ wasSearched, results }) => (
            <ErrorBoundary>
              <div>
                <SearchBox
                  searchAsYouType={false}
                  shouldClearFilters={false}
                  // Here we specify out own custom
                  // component to render the search bar:
                  inputView={SearchBoxInput}
                  className="py-2"
                />
                <div className="search-results-header flex items-center justify-end py-2">
                  {wasSearched && results.length > 0 && (
                    <PagingInfo view={PagingInfoView} />
                  )}
                </div>
                <div className="flex flex-row">
                  <div className="flex">
                    <aside className="mr-2 w-56 flex-none">
                      {wasSearched && results.length > 0 && (
                        <div className="p-2">
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
                        className="py-2"
                        shouldTrackClickThrough={false}
                        resultView={SearchResult}
                      />
                      <div className="p-2">
                        {wasSearched && results.length > 0 && <Paging />}
                      </div>
                    </div>
                  </div>
                </div>
                {wasSearched && results.length === 0 && (
                  <div>{t("no-results-found")}</div>
                )}
              </div>
            </ErrorBoundary>
          )}
        </WithSearch>
      </SearchProvider>
    </>
  );
}

export const getStaticProps: GetStaticProps<CommonPageProps> = async (
  context
) => {
  return {
    props: {
      ...(await getCommonPageProps(context)),
    },
    revalidate: 60,
  };
};
