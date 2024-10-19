"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { ErrorRequired } from "@/components/forms/error-required";

import { env } from "@/env";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusMessage } from "@/components/ui/status-message";

type Inputs = {
  username: string;
  password: string;
};

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

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async ({ username, password }: Inputs) => {
    setIsSubmitting(true);
    await signIn("credentials", {
      username,
      password,
      callbackUrl:
        typeof callbackUrl === "string" ? callbackUrl : `/${locale}}`,
    });
    setIsSubmitting(false);
  };

  const resetPasswordBackendUrl = `${env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/user/password`;

  return (
    <>
      <div className="max-w-md pt-8 pb-16 font-work">
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full max-w-2xl"
        >
          <div className="mb-6">
            <Label htmlFor="username">{t("username")}</Label>
            <Input
              id="username"
              autoComplete="username"
              aria-invalid={errors.username ? "true" : "false"}
              {...register("username", {
                required: true,
              })}
              className="inset-0 w-full h-12 p-2 border rounded border-neu-200 text-body-sm text-neu-400 ring-offset-4 focus:ring-4"
            />
            {errors.username && errors.username.type === "required" && (
              <ErrorRequired fieldTranslatedLabelKey={"username"} />
            )}
          </div>

          <div className="mb-6">
            <Label htmlFor="password">{t("password")}</Label>
            <Input
              id="password"
              autoComplete="current-password"
              type="password"
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password", {
                required: true,
              })}
              className="inset-0 w-full h-12 p-2 border rounded border-neu-200 text-body-sm text-neu-400 ring-offset-4 focus:ring-4"
            />
            {errors.password && errors.password.type === "required" && (
              <ErrorRequired fieldTranslatedLabelKey={"password"} />
            )}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {t("log-in")}
          </Button>
        </form>
        <Link className="inline-block mt-2" href={resetPasswordBackendUrl}>
          {t("reset-your-password")}
        </Link>
      </div>
    </>
  );
}
