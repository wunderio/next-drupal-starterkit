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
      <Meta title={t("Error")} metatags={[]} />
      <HeadingPage>{t("Error")}</HeadingPage>
      <p className="mt-8 text-lg">
        {t("There was an error.")}{" "}
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
