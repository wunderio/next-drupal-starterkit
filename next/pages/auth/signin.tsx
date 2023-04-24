import type { GetStaticPropsContext } from "next";
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

export default function SignIn() {
  const { t } = useTranslation();

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = async ({ username, password }: Inputs) => {
    await signIn("credentials", { username, password });
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
