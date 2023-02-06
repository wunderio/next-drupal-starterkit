import { useTranslation } from "next-i18next";
import React from "react";
import { InputViewProps } from "@elastic/react-search-ui-views";

export const SearchBoxInput: React.ComponentType<InputViewProps> = ({
  getInputProps,
  getButtonProps,
}) => {
  const { t } = useTranslation();
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <input
        {...getInputProps()}
        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-wunderpurple-100 rounded-lg bg-gray-50 focus:ring-wunderpurple-500 focus:border-wunderpurple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-wunderpurple-500 dark:focus:border-wunderpurple-500"
        placeholder={t("search-bar-placeholder-text")}
      />
      <button
        {...getButtonProps()}
        className="text-white absolute right-2.5 bottom-2.5 bg-wunderpurple-700 hover:bg-wunderpurple-800 focus:ring-4 focus:outline-none focus:ring-wunderpurple-300 font-medium rounded-md text-sm px-4 py-2"
      >
        {t("search-button-text")}
      </button>
    </div>
  );
};
