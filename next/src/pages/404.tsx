import { GetStaticProps } from "next";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import { HeadingPage } from "@/components/heading--page";
import { Meta } from "@/components/meta";
import {
  CommonPageProps,
  getCommonPageProps,
} from "@/lib/get-common-page-props";

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <>
      <Meta title={t("page-not-found")} metatags={[]} />
      <HeadingPage>{t("page-not-found")}</HeadingPage>
      <p className="mt-8 text-lg">
        {t("page-does-not-exist")}{" "}
        <Link href="/" className="hyperlink underline">
          {t("go-back-to-homepage")}
        </Link>
      </p>
    </>
  );
}

export const getStaticProps: GetStaticProps<CommonPageProps> = async (
  context,
) => {
  return {
    props: {
      ...(await getCommonPageProps(context)),
    },
    revalidate: 60,
  };
};
