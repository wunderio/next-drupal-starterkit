"use client";

import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { ErrorRequired } from "@/components/forms/error-required";

import { registerAction } from "@/lib/actions/register";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { StatusMessage } from "@/ui/status-message";

type Inputs = {
  name: string;
  email: string;
};

export default function RegisterForm() {
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<Inputs>();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, startTransition] = useTransition();

  const onSubmit = (data: Inputs) => {
    clearErrors("root.serverError");

    startTransition(async () => {
      await registerAction(data).then((res) => {
        if (res.error) {
          console.error("Error registering user", JSON.stringify(res.error));
          setError("root.serverError", {
            type: "server",
            message: res.error,
          });
          setIsSuccess(false);
        }
        if (res.success) {
          setIsSuccess(true);
        }
      });
    });
  };

  if (isSuccess) {
    return (
      <StatusMessage level="success">
        <p className="mb-4">{t("register-success")}</p>
      </StatusMessage>
    );
  }
  return (
    <>
      <div className="max-w-md pt-8 pb-16 font-work">
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
          className="flex flex-col w-full max-w-2xl gap-4"
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
              className="inset-0 w-full h-12 p-2 border rounded border-neu-200 text-body-sm text-neu-400 ring-offset-4 focus:ring-4"
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
              className="inset-0 w-full h-12 p-2 border rounded border-neu-200 text-body-sm text-neu-400 ring-offset-4 focus:ring-4"
            />
            {errors.name && errors.name.type === "required" && (
              <ErrorRequired fieldTranslatedLabelKey={"name"} />
            )}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {t("register")}
          </Button>
        </form>
      </div>
    </>
  );
}
