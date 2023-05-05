import type { GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";

import { getCommonPageProps } from "@/lib/get-common-page-props";

import { Button } from "@/wunder-component-library/button";
import { Input } from "@/wunder-component-library/input";
import { StatusMessage } from "@/wunder-component-library/status-message";

type Inputs = {
  name: string;
  username: string;
  email: string;
};

export default function Register() {
  // const { callbackUrl } = useRouter().query;
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const response = await fetch(`/api/register`, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        mail: data.email,
      }),
    });
    console.log("Registration success:", response);

    if (!response.ok) {
      // alert("Error!");
      console.error("Error registering user", response);
    }
  };
  const onErrors = (errors) => console.error(errors);

  if (isSubmitSuccessful) {
    return (
      <StatusMessage level="success">
        <p className="mb-4">
          {t("you are registered, please wait for account activation")}
        </p>
      </StatusMessage>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <form
        onSubmit={handleSubmit(onSubmit, onErrors)}
        className="flex flex-col gap-4"
      >
        <div>
          <label className="mb-1 block text-sm font-bold" htmlFor="name">
            {t("name")}
          </label>
          <Input
            id="name"
            autoComplete="name"
            {...register("name", {
              required: true,
            })}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-bold" htmlFor="email">
            {t("email")}
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email", {
              required: true,
            })}
          />
        </div>
        <Button type="submit">{t("register")}</Button>
      </form>
    </div>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      ...(await getCommonPageProps(context)),
    },
  };
}
