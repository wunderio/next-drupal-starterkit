import { GetStaticProps } from "next";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import { HeadingPage } from "@/components/heading--page";
import { Meta } from "@/components/meta";
import { REVALIDATE_LONG } from "@/lib/constants";
import {
  CommonPageProps,
  getCommonPageProps,
} from "@/lib/get-common-page-props";

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <>
      <Meta title={t("Page not found")} metatags={[]} />
      <HeadingPage>{t("Page not found")}</HeadingPage>
      <p className="mt-8 text-lg">
        {t("The page you are looking for does not exist.")}{" "}
        <Link href="/" className="hyperlink underline">
          {t("Go back to the homepage?")}
        </Link>
      </p>
    </>
  );
}

export const getStaticProps: GetStaticProps<CommonPageProps> = async ({
  locale,
}) => {
  return {
    props: {
      ...(await getCommonPageProps({ locale })),
    },
    revalidate: REVALIDATE_LONG,
  };
};
