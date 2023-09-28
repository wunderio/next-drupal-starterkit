import { useTranslation } from "next-i18next";

export function ErrorRequired({
  fieldTranslatedLabelKey,
}: {
  fieldTranslatedLabelKey: string;
}) {
  const { t } = useTranslation();
  const translatedFieldLabel = t(fieldTranslatedLabelKey);
  return (
    <span role="alert" className="text-error">
      {t("field-is-required", { field: translatedFieldLabel })}
    </span>
  );
}
