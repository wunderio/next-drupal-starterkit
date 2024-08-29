import { useTranslations } from "next-intl";
import { Paging } from "@elastic/react-search-ui";
import clsx from "clsx";

import Arrow from "@/styles/icons/arrow-down.svg";

import { Button } from "@/ui/button";

/**
 * Pagination component. To be used within the context of @elastic/react-search-ui.
 */
export function Pagination() {
  const t = useTranslations();
  return (
    <Paging
      view={({ current, totalPages, onChange }) => (
        <div className="flex items-center justify-between w-full">
          <Button
            variant="tertiary"
            onClick={() => onChange(current - 1)}
            disabled={current === 1}
          >
            <Arrow className="w-6 h-6 mr-4 rotate-90" aria-hidden />
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
            <Arrow className="w-6 h-6 ml-4 -rotate-90" aria-hidden />
          </Button>
        </div>
      )}
    />
  );
}
