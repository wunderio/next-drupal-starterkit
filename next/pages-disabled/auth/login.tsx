import type { GetStaticPropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { ErrorRequired } from "@/components/forms/error-required";
import { Meta } from "@/components/meta";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { useEffectOnce } from "@/lib/hooks/use-effect-once";

import { env } from "@/env";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { StatusMessage } from "@/ui/status-message";

type Inputs = {
  username: string;
  password: string;
};

export default function LogIn() {
  const {
    locale,
    query: {
      callbackUrl = "",
      error = "",
      enteredEmail = "",
      newPasswordRequested = false,
      passwordJustUpdated = false,
      logout = false,
    },
  } = useRouter();
  const { t } = useTranslation();

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

  useEffectOnce(() => {
    if (logout) void signOut();
  });

  return (
    <>
      <Meta title={t("log-in")} metatags={[]} />
      <div className="max-w-md pb-16 pt-8 font-work">
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
          className="flex w-full max-w-2xl flex-col"
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
              className="inset-0 h-12 w-full rounded border border-neu-200 p-2 text-body-sm text-neu-400 ring-offset-4 focus:ring-4"
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
              className="inset-0 h-12 w-full rounded border border-neu-200 p-2 text-body-sm text-neu-400 ring-offset-4 focus:ring-4"
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

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await getCommonPageProps({ locale })),
    },
  };
}
