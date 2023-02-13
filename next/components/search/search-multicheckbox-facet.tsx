import { useTranslation } from "next-i18next";
import { FacetViewProps } from "@elastic/react-search-ui-views";
import type { FieldValue } from "@elastic/search-ui";
import clsx from "clsx";

import { getFilterValueDisplay } from "@/lib/search-ui-helpers/getFilterValueDisplay";

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
    <fieldset className={clsx(className, "mb-4")}>
      <legend className="uppercase text-wunderpurple-600">{label}</legend>
      {showSearch && (
        <div>
          <input
            className="my-1 w-full border p-1"
            type="search"
            placeholder={searchPlaceholder || "Search"}
            onChange={(e) => {
              onSearch(e.target.value);
            }}
          />
        </div>
      )}
      <div className="my-2">
        {options.length < 1 && <div>No matching options</div>}
        {options.map((option) => {
          const checked = option.selected;
          const value = option.value as FieldValue;
          return (
            <label
              key={`${getFilterValueDisplay(option.value)}`}
              htmlFor={`example_facet_${label}${getFilterValueDisplay(
                option.value
              )}`}
            >
              <div className="flex items-center">
                <input
                  data-transaction-name={`facet - ${label}`}
                  id={`example_facet_${label}${getFilterValueDisplay(
                    option.value
                  )}`}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-wunderpurple-600 focus:ring-wunderpurple-500"
                  checked={checked}
                  onChange={() => (checked ? onRemove(value) : onSelect(value))}
                />
                <span className="ml-2 text-sm text-gray-900">
                  {getFilterValueDisplay(option.value)}{" "}
                  <span className="text-gray-400">
                    ({option.count.toLocaleString("en")})
                  </span>
                </span>
              </div>
            </label>
          );
        })}
      </div>
      {showMore && (
        <button
          type="button"
          className="rounded border border-wunderpurple-500 bg-transparent py-2 px-4 text-sm font-bold text-wunderpurple-700 hover:border-transparent hover:bg-wunderpurple-500 hover:text-white"
          onClick={onMoreClick}
          aria-label={t("search-show-more-options")}
        >
          + {t("search-show-more-options")}
        </button>
      )}
    </fieldset>
  );
}
