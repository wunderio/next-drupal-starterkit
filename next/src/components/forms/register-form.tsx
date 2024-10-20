"use client";

import { useTranslations } from "next-intl";
import { useTransition } from "react";
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
import {
  RegisterFormInputs,
  registerFormSchema,
} from "@/lib/zod/register-form";

import { registerAction } from "@/app/_actions/register";

export default function RegisterForm() {
  const t = useTranslations();

  const form = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const [isSubmitting, startTransition] = useTransition();

  const onSubmit = (data: RegisterFormInputs) => {
    form.clearErrors("root.serverError");

    startTransition(async () => {
      await registerAction(data).then((res) => {
        if (res.error) {
          console.error("Error registering user", JSON.stringify(res.error));
          form.setError("root.serverError", {
            type: "server",
            message: res.error,
          });
        }
      });
    });
  };

  if (form.formState.isSubmitSuccessful) {
    return (
      <StatusMessage level="success">
        <p className="mb-4">{t("register-success")}</p>
      </StatusMessage>
    );
  }
  return (
    <>
      <div className="max-w-md pt-8 pb-16 font-work">
        {form.formState.errors.root &&
          form.formState.errors.root.serverError && (
            <StatusMessage level="error">
              <p className="mb-4">
                Server error. Message:{" "}
                {form.formState.errors.root.serverError.message}, Status:{" "}
                {form.formState.errors.root.serverError.type}
              </p>
            </StatusMessage>
          )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("email")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {t("register")}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
