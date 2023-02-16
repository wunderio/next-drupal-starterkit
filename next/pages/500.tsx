import { GetStaticProps } from "next";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import { HeadingPage } from "@/components/heading--page";
import {
  CommonPageProps,
  getCommonPageProps,
} from "@/lib/get-common-page-props";

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <>
      <HeadingPage>{t("Error")}</HeadingPage>
      <p className="mt-8 text-lg">
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
