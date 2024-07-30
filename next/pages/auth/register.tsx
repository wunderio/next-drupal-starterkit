import type { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";

import { ErrorRequired } from "@/components/forms/error-required";
import { Meta } from "@/components/meta";
import { getCommonPageProps } from "@/lib/get-common-page-props";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { StatusMessage } from "@/ui/status-message";

type Inputs = {
  name: string;
  email: string;
};

export default function Register() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setError,
    clearErrors,
  } = useForm<Inputs>();

  const router = useRouter();
  const onSubmit = async (data: Inputs) => {
    clearErrors("root.serverError");
    const response = await fetch(`/api/register`, {
      method: "POST",
      body: JSON.stringify({
        mail: data.email,
        name: data.name,
      }),
      // Send the current language as header:
      headers: {
        "accept-language": router.locale || "fi",
      },
    });
    if (!response.ok) {
      const body = await response.json();
      console.error(
        "Error registering user",
        response.status,
        JSON.stringify(body),
      );
      setError("root.serverError", {
        type: String(response.status),
        message: body.error,
      });
    }
  };

  if (isSubmitSuccessful) {
    return (
      <StatusMessage level="success">
        <p className="mb-4">{t("register-success")}</p>
      </StatusMessage>
    );
  }
  return (
    <>
      <Meta title={t("register")} metatags={[]} />
      <div className="max-w-md pb-16 pt-8 font-work">
        {errors.root && errors.root.serverError && (
          <StatusMessage level="error">
            <p className="mb-4">
              Server error. Message: {errors.root.serverError.message}, Status:{" "}
              {errors.root.serverError.type}
            </p>
          </StatusMessage>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-2xl flex-col gap-4"
        >
          <div className="mb-6">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email", {
                required: true,
              })}
              aria-invalid={errors.email ? "true" : "false"}
              className="inset-0 h-12 w-full rounded border border-neu-200 p-2 text-body-sm text-neu-400 ring-offset-4 focus:ring-4"
            />
            {errors.email && errors.email.type === "required" && (
              <ErrorRequired fieldTranslatedLabelKey={"email"} />
            )}
          </div>
          <div className="mb-6">
            <Label htmlFor="name">{t("username")}</Label>
            <Input
              id="name"
              type="text"
              autoComplete="name"
              aria-invalid={errors.name ? "true" : "false"}
              {...register("name", {
                required: true,
              })}
              className="inset-0 h-12 w-full rounded border border-neu-200 p-2 text-body-sm text-neu-400 ring-offset-4 focus:ring-4"
            />
            {errors.name && errors.name.type === "required" && (
              <ErrorRequired fieldTranslatedLabelKey={"name"} />
            )}
          </div>
          <Button type="submit">{t("register")}</Button>
        </form>
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
