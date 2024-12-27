"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { LoginFormInputs, loginFormSchema } from "@/lib/zod/login-form";

import { env } from "@/env";

export default function LoginForm() {
  const locale = useLocale();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "";
  const error = searchParams.get("error") || "";
  const enteredEmail = searchParams.get("enteredEmail") || "";
  const newPasswordRequested =
    searchParams.get("newPasswordRequested") || false;
  const passwordJustUpdated = searchParams.get("passwordJustUpdated") || false;
  const logout = searchParams.get("logout") || false;

  const t = useTranslations();

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async ({ username, password }: LoginFormInputs) => {
    await signIn("credentials", {
      username,
      password,
      callbackUrl:
        typeof callbackUrl === "string" ? callbackUrl : `/${locale}}`,
    });
  };

  const resetPasswordBackendUrl = `${env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/user/password`;

  return (
    <>
      <div className="font-work max-w-md pb-16 pt-8">
        {passwordJustUpdated && (
          <StatusMessage level="success" className="mb-8">
            {t("password-updated-login-below")}
          </StatusMessage>
        )}
        {newPasswordRequested && (
          <StatusMessage level="info" className="mb-8">
            {t("password-reset-check-your-email", { email: enteredEmail })}
          </StatusMessage>
        )}
        {logout && (
          <StatusMessage level="info" className="mb-8">
            {t("your-session-has-expired")}
          </StatusMessage>
        )}
        {error && (
          <StatusMessage level="error" className="mb-8">
            {t("login-error-check-username-password")}
          </StatusMessage>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("username")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("username")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("password")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("password")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {t("log-in")}
            </Button>
          </form>
        </Form>
        <Link className="mt-2 inline-block" href={resetPasswordBackendUrl}>
          {t("reset-your-password")}
        </Link>
      </div>
    </>
  );
}
