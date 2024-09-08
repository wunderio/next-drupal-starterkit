"use client";
import Link from "next/link";
import {
  Configure,
  CurrentRefinements,
  DynamicWidgets,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
  Stats,
  useQueryRules,
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
  <div className="panel">
    <h5>{header}</h5>
    {children}
  </div>
);

const QueryRulesBanner = () => {
  const { items } = useQueryRules({});
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="query-rules">
      {items.map((item) => (
        <div key={item.objectID} className="query-rules__item">
          <a href={item.url}>
            <b className="query-rules__item-title">{item.title}</b>
            <span className="query-rules__item-description">{item.body}</span>
          </a>
        </div>
      ))}
    </div>
  );
};

export default function Web({ params: { locale } }) {
  console.log("locale", locale);
  return (
    <div className="">
      <InstantSearch
        indexName={`content-${locale}`}
        searchClient={searchClient}
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
              <Stats />
            </div>
          </aside>
          <div className="flex-1">
            <div className="searchbox">
              <SearchBox />
            </div>

            <CurrentRefinements />
            <QueryRulesBanner />

            <Hits hitComponent={HitView} />
            <Pagination />
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}
