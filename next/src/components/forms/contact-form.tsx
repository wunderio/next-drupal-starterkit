"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { createContactSubmissionAction } from "@/app/_actions/contact";
import { AuthGateClient } from "@/components/auth-gate-client";
import { HeadingParagraph } from "@/components/heading--paragraph";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { StatusMessage } from "@/components/ui/status-message";
import { Textarea } from "@/components/ui/textarea";
import { ContactFormInputs, contactFormSchema } from "@/lib/zod/contact-form";

export function ContactForm() {
  const t = useTranslations();

  const form = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormInputs) {
    const response = await createContactSubmissionAction(values);
    if (!response.success) {
      toast.error(t("there-was-an-error"));
    }
  }

  if (form.formState.isSubmitSuccessful) {
    return (
      <StatusMessage level="success" className="mx-auto w-full max-w-3xl">
        <p className="mb-4">{t("form-thank-you-message")}</p>
        <Button type="button" onClick={() => form.reset()}>
          {t("form-send-another-message")}
        </Button>
      </StatusMessage>
    );
  }

  return (
    <div className="mx-auto mb-4 flex max-w-xl flex-col gap-5 rounded border border-border p-4 shadow-md transition-all">
      <HeadingParagraph>{t("form-title")}</HeadingParagraph>
      <AuthGateClient text={t("login-to-fill-form")}>
        <p className="text-muted-foreground">{t("form-description")}</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form-label-name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("form-label-name")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form-label-email")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("form-label-email")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form-label-subject")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("form-label-subject")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form-label-message")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("form-label-message")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {t("form-submit")}
            </Button>
          </form>
        </Form>
      </AuthGateClient>
    </div>
  );
}
