import type { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { HeadingPage } from "@/components/heading--page";
import { Meta } from "@/components/meta";
import { getCommonPageProps } from "@/lib/get-common-page-props";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { StatusMessage } from "@/ui/status-message";

type Inputs = {
  username: string;
  password: string;
};

export default function LogIn() {
  const { callbackUrl, error } = useRouter().query;
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<Inputs>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async ({ username, password }: Inputs) => {
    setIsSubmitting(true);
    await signIn("credentials", {
      username,
      password,
      callbackUrl: typeof callbackUrl === "string" ? callbackUrl : "/",
    });
    setIsSubmitting(false);
  };

  return (
    <>
      <Meta title={t("log-in")} metatags={[]} />

      <HeadingPage>{t("log-in")}</HeadingPage>
      <div className="max-w-md py-4">
        {error && (
          <StatusMessage level="error" className="mb-8">
            {t("login-error-check-username-password")}
          </StatusMessage>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="username">{t("username")}</Label>
            <Input
              id="username"
              autoComplete="username"
              {...register("username", {
                required: true,
              })}
            />
          </div>

          <div>
            <Label htmlFor="password">{t("password")}</Label>
            <Input
              id="password"
              autoComplete="current-password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {t("log-in")}
          </Button>
        </form>
      </div>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      ...(await getCommonPageProps(context)),
    },
  };
}
