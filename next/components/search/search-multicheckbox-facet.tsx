import { useTranslation } from "next-i18next";
import React from "react";
import { FacetViewProps } from "@elastic/react-search-ui-views";
import type { FieldValue } from "@elastic/search-ui";
import appendClassName from "lib/search-ui-helpers/appendClassName";
import getFilterValueDisplay from "lib/search-ui-helpers/getFilterValueDisplay";

function MultiCheckboxFacet({
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
  const { t } = useTranslation("common");
  return (
    <fieldset className={appendClassName("mb-4", className)}>
      <legend className="uppercase text-wunderpurple-600">{label}</legend>
      {showSearch && (
        <div>
          <input
            className="border w-full p-1 my-1"
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
                  className="w-4 h-4 text-wunderpurple-600 bg-gray-100 border-gray-300 rounded focus:ring-wunderpurple-500"
                  checked={checked}
                  onChange={() => (checked ? onRemove(value) : onSelect(value))}
                />
                <span className="ml-2 text-sm font-medium text-gray-900">
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
          className="text-xs bg-transparent hover:bg-wunderpurple-500 text-wunderpurple-700 font-semibold hover:text-white py-2 px-4 border border-wunderpurple-500 hover:border-transparent rounded"
          onClick={onMoreClick}
          aria-label={t("search-show-more-options")}
        >
          + {t("search-show-more-options")}
        </button>
      )}
    </fieldset>
  );
}

export default MultiCheckboxFacet;
