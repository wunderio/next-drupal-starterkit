import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export default function SearchBoxNavbar() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <form
      action={`/${router.locale}/search`}
      method="get"
      className="mt-3 mr-2 flex h-12"
    >
      <input
        id="q"
        name="q"
        className="rounded-lg border border-wunderpurple-100 bg-gray-50 p-2 text-sm text-gray-900 focus:border-wunderpurple-500 focus:ring-wunderpurple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-wunderpurple-500 dark:focus:ring-wunderpurple-500"
        placeholder={t("search-bar-placeholder-text")}
      />
      <button className="flex rounded-md bg-wunderpurple-700 px-4 py-2 text-sm font-medium text-white hover:bg-wunderpurple-800 focus:outline-none focus:ring-4 focus:ring-wunderpurple-300">
        <svg
          aria-hidden="true"
          className="h-5 h-full w-5 text-gray-500 dark:text-gray-400"
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
        <div className="m-[auto] hidden">{t("search-button-text")}</div>
      </button>
    </form>
  );
}
