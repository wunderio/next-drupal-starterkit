import { GetStaticProps } from "next";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import {
  CommonPageProps,
  getCommonPageProps,
} from "@/lib/get-common-page-props";

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <>
      <h1 className="mb-4 text-heading-2xl font-bold">{t("Error")}</h1>
      <p className="text-lg">
        {t("There was an error.")}{" "}
        <Link href="/" className="text-wunderpurple-500 hover:underline">
          {t("Go back to the homepage?")}
        </Link>
      </p>
    </>
  );
}

export const getStaticProps: GetStaticProps<CommonPageProps> = async (
  context
) => {
  return {
    props: {
      ...(await getCommonPageProps(context)),
    },
    revalidate: 60,
  };
};
