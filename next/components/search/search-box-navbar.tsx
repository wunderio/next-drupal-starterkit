import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export default function SearchBoxNavbar() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <form
      action={`/${router.locale}/search`}
      method="get"
      className="flex h-12 mt-3 mr-2"
    >
      <input
        id="q"
        name="q"
        className="p-2 text-sm text-gray-900 border border-wunderpurple-100 rounded-lg bg-gray-50 focus:ring-wunderpurple-500 focus:border-wunderpurple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-wunderpurple-500 dark:focus:border-wunderpurple-500"
        placeholder={t("search-bar-placeholder-text")}
      />
      <button className="flex text-white bg-wunderpurple-700 hover:bg-wunderpurple-800 focus:ring-4 focus:outline-none focus:ring-wunderpurple-300 font-medium rounded-md text-sm px-4 py-2">
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-gray-500 dark:text-gray-400 h-full"
          fill="none"
          stroke="white"
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
        <div className="hidden m-[auto]">{t("search-button-text")}</div>
      </button>
    </form>
  );
}
