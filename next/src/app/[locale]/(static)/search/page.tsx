"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Configure,
  DynamicWidgets,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
  Stats,
} from "react-instantsearch";
import Client from "@searchkit/instantsearch-client";

const searchClient = Client({
  url: "/api/search",
});

const HitView = ({ hit }) => {
  return (
    <Link href={hit.path}>
      <div>
        <h2 className="text-xl font-semibold mb-2">
          <Highlight attribute="title" hit={hit} />
        </h2>
        <p className="text-gray-600">{hit.excerpt}</p>
      </div>
    </Link>
  );
};

const Panel = ({ header, children }: any) => (
  <div className="panel mb-2">
    <h5 className="text-heading-xs">{header}</h5>
    {children}
  </div>
);

export default function Web({ params: { locale } }) {
  const t = useTranslations();
  return (
    <div className="">
      <InstantSearch
        indexName={`content-${locale}`}
        searchClient={searchClient}
        future={{
          preserveSharedStateOnUnmount: true,
          persistHierarchicalRootCount: true,
        }}
        routing
      >
        <Configure hitsPerPage={10} />
        <div className="flex flex-col md:flex-row">
          <aside className="mr-2 w-56">
            <div className="search-panel__filters">
              <DynamicWidgets facets={["*"]}>
                <Panel header="Content Type">
                  <RefinementList attribute="content_type" />
                </Panel>
                <Panel header="Tags">
                  <RefinementList attribute="tags" />
                </Panel>
              </DynamicWidgets>
              <Stats
                translations={{
                  rootElementText({
                    nbHits,
                    processingTimeMS,
                    nbSortedHits,
                    areHitsSorted,
                  }) {
                    return areHitsSorted && nbHits !== nbSortedHits
                      ? t("Search.Stats.sorted-hits-text", {
                          sortedHits: nbSortedHits.toLocaleString(),
                          hits: nbHits.toLocaleString(),
                          time: processingTimeMS.toLocaleString(),
                        })
                      : t("Search.Stats.hits-text", {
                          hits: nbHits.toLocaleString(),
                          time: processingTimeMS.toLocaleString(),
                        });
                  },
                }}
              />
            </div>
          </aside>
          <div className="flex-1">
            <div className="searchbox pb-4">
              <SearchBox
                translations={{
                  submitButtonTitle: t("Search.SearchBox.submit-button-title"),
                  resetButtonTitle: t("Search.SearchBox.reset-button-title"),
                }}
              />
            </div>
            <Hits hitComponent={HitView} />
            <Pagination
              className="mt-2"
              translations={{
                firstPageItemAriaLabel: t(
                  "Search.Pagination.first-page-item-aria-label",
                ),
                previousPageItemAriaLabel: t(
                  "Search.Pagination.previous-page-item-aria-label",
                ),
                nextPageItemAriaLabel: t(
                  "Search.Pagination.next-page-item-aria-label",
                ),
                lastPageItemAriaLabel: t(
                  "Search.Pagination.last-page-item-aria-label",
                ),
                pageItemAriaLabel: ({ currentPage, nbPages }) =>
                  t("Search.Pagination.page-item-aria-label", {
                    currentPage,
                    nbPages,
                  }),
              }}
            />
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}
