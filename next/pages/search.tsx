import "@elastic/react-search-ui-views/lib/styles/styles.css";

import { GetStaticPropsResult } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
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
  Sorting,
  WithSearch,
} from "@elastic/react-search-ui";
import { Layout as SearchLayout } from "@elastic/react-search-ui-views";
import { Layout, LayoutProps } from "components/layout";
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

        <h1>Search</h1>

        <div>
          <SearchProvider config={config}>
            <WithSearch
              mapContextToProps={({ wasSearched }) => ({ wasSearched })}
            >
              {({ wasSearched }) => (
                <div className="App">
                  <ErrorBoundary>
                    <SearchLayout
                      header={<SearchBox autocompleteSuggestions={false} />}
                      sideContent={
                        <div>
                          {wasSearched && (
                            <Sorting
                              label={"Sort by"}
                              sortOptions={[
                                {
                                  name: "Relevance",
                                  value: "",
                                  direction: "",
                                },
                                {
                                  name: "Title",
                                  value: "title",
                                  direction: "asc",
                                },
                              ]}
                            />
                          )}
                          <Facet
                            field="tags"
                            label="Tags"
                            filterType="any"
                            isFilterable={true}
                          />
                          <Facet field="category" label="Recipe Category" />
                        </div>
                      }
                      bodyContent={
                        <Results
                          titleField="title"
                          urlField="link"
                          shouldTrackClickThrough={true}
                        />
                      }
                      bodyHeader={
                        <React.Fragment>
                          {wasSearched && <PagingInfo />}
                          {wasSearched && <ResultsPerPage />}
                        </React.Fragment>
                      }
                      bodyFooter={<Paging />}
                    />
                  </ErrorBoundary>
                </div>
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
