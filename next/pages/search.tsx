import "@elastic/react-search-ui-views/lib/styles/styles.css";

import { GetStaticPropsResult } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import {
  ErrorBoundary,
  Facet,
  Paging,
  PagingInfo,
  Results,
  ResultsPerPage,
  SearchBox,
  SearchProvider,
  WithSearch,
} from "@elastic/react-search-ui";
import { Layout, LayoutProps } from "components/layout";
import { SearchBoxInput } from "components/search/search-box-input";
import { getMenus } from "lib/get-menus";
import buildRequest from "lib/search-ui-helpers/buildRequest";
import buildState from "lib/search-ui-helpers/buildState";
import runRequest from "lib/search-ui-helpers/runRequest";
import { setLanguageLinks } from "lib/utils";

import { LangContext } from "./_app";

/**
 * Contains the search provider component.
 */
export default function SearchPage({ menus }: LayoutProps) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const config = {
    debug: false,
    hasA11yNotifications: true,
    apiConnector: null,
    onResultClick: () => {
      /* Not implemented */
    },
    onSearch: async (state) => {
      const { resultsPerPage } = state;
      const requestBody = buildRequest(state);
      const responseJson = await runRequest(requestBody, router.locale);
      return buildState(responseJson, resultsPerPage, state);
    },
  };
  return (
    <LangContext.Provider
      value={{
        languageLinks: setLanguageLinks([]),
      }}
    >
      <Layout menus={menus}>
        <Head>
          <title>Next.js for Drupal</title>
          <meta
            name="description"
            content="A Next.js site powered by a Drupal backend."
          />
        </Head>

        <h1 className="mb-10 text-6xl font-black">{t("search")}</h1>

        <div>
          <SearchProvider config={config}>
            <WithSearch
              mapContextToProps={({ wasSearched, results }) => ({
                wasSearched,
                results,
              })}
            >
              {({ wasSearched, results }) => (
                <ErrorBoundary>
                  <div className="search-ui">
                    <SearchBox
                      searchAsYouType={false}
                      shouldClearFilters={false}
                      // Here we specify out own custom
                      // component to render the search bar:
                      inputView={SearchBoxInput}
                      className="py-2"
                    />
                    <div className="search-results-header flex items-center justify-end gap-x-5 py-2">
                      {wasSearched && results.length > 0 && <PagingInfo />}
                      {wasSearched && results.length > 0 && <ResultsPerPage />}
                    </div>
                    <div className="flex flex-row">
                      <div className="flex">
                        <aside className="w-56 flex-none">
                          {wasSearched && results.length > 0 && (
                            <div className="p-2">
                              <Facet field="tags" label={t("tags")} />
                              <Facet
                                field="content_type"
                                label={t("content-type")}
                              />
                            </div>
                          )}
                        </aside>

                        <main className="flex-1 ">
                          <div className="search-results py-2">
                            <Results
                              titleField="title"
                              urlField="path"
                              shouldTrackClickThrough={false}
                            />
                          </div>
                          <div className="search-results-footer p-2">
                            {wasSearched && results.length > 0 && <Paging />}
                          </div>
                        </main>
                      </div>
                    </div>
                    {wasSearched && results.length == 0 && (
                      <div className="search-no-results">
                        {t("no-results-found")}
                      </div>
                    )}
                  </div>
                </ErrorBoundary>
              )}
            </WithSearch>
          </SearchProvider>
        </div>
      </Layout>
    </LangContext.Provider>
  );
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<LayoutProps>> {
  return {
    props: {
      menus: await getMenus(context),
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
    revalidate: 60,
  };
}
