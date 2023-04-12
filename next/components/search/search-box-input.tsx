import { useTranslation } from "next-i18next";
import { InputViewProps } from "@elastic/react-search-ui-views";

import SearchIcon from "@/styles/icons/search.svg";

export const SearchBoxInput: React.ComponentType<InputViewProps> = ({
  getInputProps,
  getButtonProps,
}) => {
  const { t } = useTranslation();
  return (
    <div className="relative w-full max-w-xl">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchIcon aria-hidden className="h-5 w-5 text-scapaflow" />
      </div>
      <input
        {...getInputProps()}
        className="block w-full rounded-lg border border-primary-100 bg-white p-4 pl-10 text-sm text-steelgray focus:border-primary-500 focus:ring-primary-500"
        placeholder={t("search-bar-placeholder-text")}
      />
      <button
        {...getButtonProps()}
        className="absolute bottom-2.5 right-2.5 rounded-md bg-primary-600 px-4 py-2 text-sm text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
      >
        {t("search-button-text")}
      </button>
    </div>
  );
};
