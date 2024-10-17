import { useTranslations } from "next-intl";

import { ContactForm } from "./contact-form";
import { AuthGateClient } from "../auth-gate-client";

export function ContactFormContainer() {
  const t = useTranslations();

  return (
    <div className="flex flex-col max-w-3xl gap-5 p-4 mx-auto mb-4 transition-all bg-white border rounded shadow-md border-finnishwinter hover:shadow-md">
      <h2 className="font-bold text-heading-sm md:text-heading-md">
        {t("form-title")}
      </h2>
      <AuthGateClient text={t("login-to-fill-form")}>
        <p>{t("form-description")}</p>
        <ContactForm />
      </AuthGateClient>
    </div>
  );
}
