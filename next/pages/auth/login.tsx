import type { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";

import { getCommonPageProps } from "@/lib/get-common-page-props";

import { Button } from "@/wunder-component-library/button";
import { Input } from "@/wunder-component-library/input";

type Inputs = {
  username: string;
  password: string;
};

export default function LogIn() {
  const router = useRouter();
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = async ({ username, password }: Inputs) => {
    const { callbackUrl } = router.query;
    await signIn("credentials", {
      username,
      password,
      callbackUrl: typeof callbackUrl === "string" ? callbackUrl : "/",
    });
  };

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex max-w-md flex-col gap-4"
    >
      <div>
        <label className="mb-1 block text-sm font-bold" htmlFor="username">
          {t("username")}
        </label>
        <Input
          id="username"
          autoComplete="username"
          {...register("username", {
            required: true,
          })}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-bold" htmlFor="password">
          {t("password")}
        </label>
        <Input
          id="password"
          autoComplete="current-password"
          type="password"
          {...register("password", {
            required: true,
          })}
        />
      </div>

      <Button type="submit">{t("log-in")}</Button>
    </form>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      ...(await getCommonPageProps(context)),
    },
  };
}
