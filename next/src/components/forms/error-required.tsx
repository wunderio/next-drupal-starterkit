import { useTranslations } from "next-intl";

import { TranslationKey } from "@/types/next-intl";

export function ErrorRequired({
  fieldTranslatedLabelKey,
}: {
  fieldTranslatedLabelKey: TranslationKey;
}) {
  const t = useTranslations();
  const translatedFieldLabel = t(fieldTranslatedLabelKey);

  return (
    <span role="alert" className="text-error">
      {t("field-is-required", { field: translatedFieldLabel })}
    </span>
  );
}
