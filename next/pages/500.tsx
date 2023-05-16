import { GetStaticProps } from "next";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import { Heading } from "@/components/heading";
import { HeadingLevel } from "@/components/heading-level/heading-level";
import { Meta } from "@/components/meta";
import {
  CommonPageProps,
  getCommonPageProps,
} from "@/lib/get-common-page-props";

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <HeadingLevel.Boundary>
      <Meta title={t("Error")} metatags={[]} />
      <Heading>{t("Error")}</Heading>
      <p className="mt-8 text-lg">
        {t("There was an error.")}{" "}
        <Link href="/" className="hyperlink underline">
          {t("Go back to the homepage?")}
        </Link>
      </p>
    </HeadingLevel.Boundary>
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
