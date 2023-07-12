import { useTranslation } from "next-i18next";
import { Paging } from "@elastic/react-search-ui";
import clsx from "clsx";

import Arrow from "@/styles/icons/arrow-down.svg";

import { Button } from "@/ui/button";

/**
 * Pagination component. To be used within the context of @elastic/react-search-ui.
 */
export function Pagination() {
  const { t } = useTranslation();
  return (
    <Paging
      view={({ current, totalPages, onChange }) => (
        <div className="flex w-full items-center justify-between">
          <Button
            variant="tertiary"
            onClick={() => onChange(current - 1)}
            disabled={current === 1}
          >
            <Arrow className="mr-4 h-6 w-6 rotate-90" aria-hidden />
            {t("search-previous")}
          </Button>

          <ol>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li className="inline-block" key={page}>
                <button
                  onClick={() => onChange(page)}
                  className={clsx(
                    "h-10 w-10 rounded-full text-primary-600 hover:enabled:underline",
                    current === page && "bg-steelgray text-white",
                  )}
                  aria-label={t("search-go-to-page", { page })}
                  aria-current={current === page ? "page" : undefined}
                  disabled={current === page}
                >
                  {page}
                </button>
              </li>
            ))}
          </ol>

          <Button
            variant="tertiary"
            onClick={() => onChange(current + 1)}
            disabled={current === totalPages}
          >
            {t("search-next")}
            <Arrow className="ml-4 h-6 w-6 -rotate-90" aria-hidden />
          </Button>
        </div>
      )}
    />
  );
}
