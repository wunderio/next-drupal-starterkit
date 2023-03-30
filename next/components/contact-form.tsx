import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function ContactForm() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitted },
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
    });

    if (!response.ok) {
      alert("Error!");
    }
  };

  return (
    <div className="mb-4 rounded border bg-white p-4 shadow-md transition-all hover:shadow-md">
      {isSubmitted && (
        <div
          className="border-l-4 border-wunderpurple-500 bg-wunderpurple-100 p-4 text-wunderpurple-700"
          role="alert"
        >
          <p className="mb-3 text-xl font-bold">
            {t("form-thank-you-message")}
          </p>
          <button
            className="rounded bg-wunderpurple-500 px-4 py-2 font-bold text-white hover:bg-wunderpurple-700"
            onClick={() => reset()}
          >
            {t("form-send-another-message")}
          </button>
        </div>
      )}
      {!isSubmitted && (
        <form
          onSubmit={void handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <h2 className="text-heading-sm font-bold md:text-heading-md">
            {t("form-title")}
          </h2>
          <p>{t("form-description")}</p>
          <div>
            <label className="mb-2 block text-sm font-bold" htmlFor="name">
              {t("form-label-name")}
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 shadow"
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
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 shadow"
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
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 shadow"
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
            <textarea
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 shadow"
              id="message"
              {...register("message", {
                required: true,
              })}
            />
          </div>

          <button
            className="focus:shadow-outline rounded bg-wunderpurple-500 px-4 py-2 font-bold text-white hover:bg-wunderpurple-700"
            type="submit"
          >
            {t("form-submit")}
          </button>
        </form>
      )}
    </div>
  );
}
