import { useTranslations } from "next-intl";

import { AuthGateServer } from "../auth-gate-server";

import { ContactForm } from "./contact-form";

export function ContactFormContainer() {
  const t = useTranslations();

  return (
    <div className="flex flex-col max-w-3xl gap-5 p-4 mx-auto mb-4 transition-all bg-white border rounded shadow-md border-finnishwinter hover:shadow-md">
      <h2 className="font-bold text-heading-sm md:text-heading-md">
        {t("form-title")}
      </h2>
      <AuthGateServer text={t("login-to-fill-form")}>
        <p>{t("form-description")}</p>
        <ContactForm />
      </AuthGateServer>
    </div>
  );
}
