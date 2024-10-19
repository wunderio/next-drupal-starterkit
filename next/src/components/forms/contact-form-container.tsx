import { useTranslations } from "next-intl";

import { AuthGateClient } from "../auth-gate-client";
import { HeadingParagraph } from "../heading--paragraph";

import { ContactForm } from "./contact-form";

export function ContactFormContainer() {
  const t = useTranslations();

  return (
    <div className="flex flex-col max-w-xl gap-5 p-4 mx-auto mb-4 transition-all border rounded shadow-md border-border">
      <HeadingParagraph>{t("form-title")}</HeadingParagraph>
      <AuthGateClient text={t("login-to-fill-form")}>
        <p>{t("form-description")}</p>
        <ContactForm />
      </AuthGateClient>
    </div>
  );
}
