import { useTranslations } from "next-intl";
import { InputHTMLAttributes, useId } from "react";
import { InputViewProps } from "@elastic/react-search-ui-views";

import SearchIcon from "@/styles/icons/search.svg";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

export function SearchBoxInput({
  getInputProps,
  getButtonProps,
}: InputViewProps) {
  const t = useTranslations();
  const buttonId = useId();
  return (
    <div className="relative w-full max-w-xl mx-auto h-14 bg-primary-200">
      <SearchIcon
        aria-hidden
        className="absolute z-10 w-8 h-8 pointer-events-none left-3 top-3 text-graysuit"
      />
      <Input
        {...getInputProps({
          placeholder: t("search-bar-placeholder-text"),
          "aria-labelledby": buttonId,
          className: "absolute inset-0 h-full pl-12",
        } satisfies InputHTMLAttributes<HTMLInputElement>)}
      />
      <Button
        {...getButtonProps({
          id: buttonId,
          className:
            "absolute bottom-1.5 right-1.5 top-1.5 ring-offset-4 leading-1 px-2.5",
        } satisfies InputHTMLAttributes<HTMLButtonElement>)}
      >
        {t("search-button-text")}
      </Button>
    </div>
  );
}
