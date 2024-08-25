import { useTranslations } from "next-intl";

export function ErrorRequired({
  fieldTranslatedLabelKey,
}: {
  fieldTranslatedLabelKey: string;
}) {
  const t = useTranslations();
  const translatedFieldLabel = t(fieldTranslatedLabelKey);

  return (
    <span role="alert" className="text-error">
      {t("field-is-required", { field: translatedFieldLabel })}
    </span>
  );
}
