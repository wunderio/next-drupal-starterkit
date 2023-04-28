import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";

import { Button } from "@/wunder-component-library/button";
import { Input } from "@/wunder-component-library/input";
import { StatusMessage } from "@/wunder-component-library/status-message";
import { Textarea } from "@/wunder-component-library/textarea";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function ContactForm() {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const response = await fetch(`/api/contact`, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
        subject: data.subject,
      }),
      // This will record the submission with the right language:
      headers: {
        "accept-language": router.locale,
      },
    });

    if (!response.ok) {
      alert("Error!");
    }
  };

  const onErrors = (errors) => console.error(errors);

  if (isSubmitSuccessful) {
    return (
      <StatusMessage level="success">
        <p className="mb-4">{t("form-thank-you-message")}</p>
        <Button type="button" onClick={() => reset()}>
          {t("form-send-another-message")}
        </Button>
      </StatusMessage>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onErrors)}
      className="mb-4 flex flex-col gap-5 rounded border border-finnishwinter bg-white p-4 shadow-md transition-all hover:shadow-md"
    >
      <h2 className="text-heading-sm font-bold md:text-heading-md">
        {t("form-title")}
      </h2>
      <p>{t("form-description")}</p>
      <div>
        <label className="mb-2 block text-sm font-bold" htmlFor="name">
          {t("form-label-name")}
        </label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: true,
          })}
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-bold" htmlFor="email">
          {t("form-label-email")}
        </label>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: true,
          })}
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-bold" htmlFor="subject">
          {t("form-label-subject")}
        </label>
        <Input
          type="text"
          id="subject"
          {...register("subject", {
            required: true,
          })}
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-bold" htmlFor="message">
          {t("form-label-message")}
        </label>
        <Textarea
          id="message"
          {...register("message", {
            required: true,
          })}
        />
      </div>

      <Button type="submit">{t("form-submit")}</Button>
    </form>
  );
}
