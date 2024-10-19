"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { createContactSubmissionAction } from "@/app/_actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusMessage } from "@/components/ui/status-message";
import { Textarea } from "@/components/ui/textarea";

export type ContactFormInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function ContactForm() {
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, isSubmitting },
  } = useForm<ContactFormInputs>();

  const onSubmit = async (data: ContactFormInputs) => {
    const response = await createContactSubmissionAction(data);
    if (!response.success) {
      alert(t("there-was-an-error"));
    }
  };

  const onErrors = (errors) => console.error(errors);

  if (isSubmitSuccessful) {
    return (
      <StatusMessage level="success" className="w-full max-w-3xl mx-auto">
        <p className="mb-4">{t("form-thank-you-message")}</p>
        <Button type="button" onClick={() => reset()}>
          {t("form-send-another-message")}
        </Button>
      </StatusMessage>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onErrors)}>
      <div>
        <Label htmlFor="name">{t("form-label-name")}</Label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: true,
          })}
        />
      </div>
      <div>
        <Label htmlFor="email">{t("form-label-email")}</Label>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: true,
          })}
        />
      </div>
      <div>
        <Label htmlFor="subject">{t("form-label-subject")}</Label>
        <Input
          type="text"
          id="subject"
          {...register("subject", {
            required: true,
          })}
        />
      </div>
      <div>
        <Label htmlFor="message">{t("form-label-message")}</Label>
        <Textarea
          id="message"
          {...register("message", {
            required: true,
          })}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {t("form-submit")}
      </Button>
    </form>
  );
}
