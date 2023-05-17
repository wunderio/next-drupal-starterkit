import { useTranslation } from "next-i18next";
import { FacetViewProps } from "@elastic/react-search-ui-views";
import type { FieldValue } from "@elastic/search-ui";
import clsx from "clsx";

import { getFilterValueDisplay } from "@/lib/search-ui-helpers/getFilterValueDisplay";

import { Checkbox } from "@/wunder-component-library/checkbox";

export function MultiCheckboxFacet({
  className,
  label,
  onMoreClick,
  onRemove,
  onSelect,
  options,
  showMore,
  showSearch,
  onSearch,
  searchPlaceholder,
}: FacetViewProps) {
  const { t } = useTranslation();
  return (
    <section className={clsx(className, "mb-4")}>
      <div className="mb-5 text-heading-xs font-bold text-steelgray">
        {label}
      </div>
      {showSearch && (
        <div>
          <input
            className="mb-1 w-full border border-finnishwinter p-1"
            type="search"
            placeholder={searchPlaceholder || "Search"}
            onChange={(e) => {
              onSearch(e.target.value);
            }}
          />
        </div>
      )}
      <ul className="mb-2">
        {options.length < 1 && <div>No matching options</div>}
        {options.map((option) => {
          const checked = option.selected;
          const value = option.value as FieldValue;
          return (
            <li key={`${getFilterValueDisplay(option.value)}`}>
              <div className="flex items-center">
                <Checkbox
                  data-transaction-name={`facet - ${label}`}
                  id={`example_facet_${label}${getFilterValueDisplay(
                    option.value
                  )}`}
                  checked={checked}
                  onClick={() => (checked ? onRemove(value) : onSelect(value))}
                  aria-label={`example_facet_${label}${getFilterValueDisplay(
                    option.value
                  )}-title`}
                />
                <span
                  className="ml-2 text-sm text-steelgray"
                  title={`${t("filter-by")} ${getFilterValueDisplay(
                    option.value
                  )} (${option.count.toLocaleString("en")})`}
                >
                  {getFilterValueDisplay(option.value)}{" "}
                  <span className="text-steelgray">
                    ({option.count.toLocaleString("en")})
                  </span>
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      {showMore && (
        <button
          type="button"
          className="rounded border border-primary-500 bg-transparent px-4 py-2 text-sm font-bold text-primary-600 hover:border-transparent hover:bg-primary-500 hover:text-white"
          onClick={onMoreClick}
          aria-label={t("search-show-more-options")}
        >
          + {t("search-show-more-options")}
        </button>
      )}
    </section>
  );
}
