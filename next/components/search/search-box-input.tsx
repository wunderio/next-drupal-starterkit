import { useTranslation } from "next-i18next";
import { InputViewProps } from "@elastic/react-search-ui-views";

import MagnifierIcon from "@/styles/icons/magnifier.svg";

export const SearchBoxInput: React.ComponentType<InputViewProps> = ({
  getInputProps,
  getButtonProps,
}) => {
  const { t } = useTranslation();
  return (
    <div className="relative w-full max-w-xl">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifierIcon
          aria-hidden
          className="h-5 w-5 text-gray-500 dark:text-gray-400"
        />
      </div>
      <input
        {...getInputProps()}
        className="block w-full rounded-lg border border-wunderpurple-100 bg-white p-4 pl-10 text-sm text-gray-900 focus:border-wunderpurple-500 focus:ring-wunderpurple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-wunderpurple-500 dark:focus:ring-wunderpurple-500"
        placeholder={t("search-bar-placeholder-text")}
      />
      <button
        {...getButtonProps()}
        className="absolute right-2.5 bottom-2.5 rounded-md bg-wunderpurple-700 px-4 py-2 text-sm text-white hover:bg-wunderpurple-800 focus:outline-none focus:ring-4 focus:ring-wunderpurple-300"
      >
        {t("search-button-text")}
      </button>
    </div>
  );
};
