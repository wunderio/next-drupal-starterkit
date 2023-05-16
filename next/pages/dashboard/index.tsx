import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { HeadingPage } from "@/components/heading";
import { Meta } from "@/components/meta";
import { drupal } from "@/lib/drupal";
import {
  CommonPageProps,
  getCommonPageProps,
} from "@/lib/get-common-page-props";
import { formatDateComplete } from "@/lib/utils";
import {
  isWebformSubmissionsListEmpty,
  validateAndCleanupWebformSubmissionList,
  WebformSubmissionsListEmpty,
  WebformSubmissionsListItem,
} from "@/lib/zod/webform-submission-list";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default function DashboardPage({
  submissions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation();
  const { data } = useSession();
  const router = useRouter();
  return (
    <>
      <Meta title={t("user-dashboard")} metatags={[]} />
      <HeadingPage>{t("user-dashboard")}</HeadingPage>
      <p className="my-6 text-justify text-md/xl text-scapaflow sm:text-lg">
        {t("user-dashboard-intro-greeting", { username: data.user.name })}
      </p>
      <table className="w-full border-collapse text-left">
        <thead className="border border-primary-700 bg-primary-700 text-heading-xs font-bold text-white">
          <tr>
            <th className="px-3 py-4">{t("form")}</th>
            <th className="px-3 py-4">{t("date")}</th>
            <th className="px-3 py-4">{t("more-details")}</th>
          </tr>
        </thead>
        <tbody className="bg-white text-sm text-steelgray">
          {submissions.map((submission) => (
            <tr
              key={submission.uuid[0]["value"]}
              className="border border-graysuit"
            >
              <td className="p-3">{submission.webform_id[0]["target_id"]}</td>
              <td className="p-3">
                {formatDateComplete(
                  submission.completed[0]["value"],
                  router.locale
                )}
              </td>
              <td className="p-3">
                <Link
                  href={`/dashboard/webforms/${submission.webform_id[0]["target_id"]}/${submission.uuid[0]["value"]}`}
                  className="hyperlink"
                >
                  {t("see-more")}
                </Link>
              </td>
            </tr>
          ))}

          {submissions.length === 0 && (
            <tr className="border border-graysuit">
              <td colSpan={3} className="p-3">
                {t("no-submissions-yet")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  CommonPageProps & {
    submissions: WebformSubmissionsListItem[];
  }
> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const url = drupal.buildUrl(
    `/${context.locale}/rest/my-webform-submissions?_format=json`
  );

  const result = await drupal.fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Pass the token to authenticate the request:
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  const submissionsViewResult = (await result.json()) as
    | WebformSubmissionsListEmpty
    | WebformSubmissionsListItem[];

  const submissions = isWebformSubmissionsListEmpty(submissionsViewResult)
    ? []
    : validateAndCleanupWebformSubmissionList(submissionsViewResult);

  return {
    props: {
      ...(await getCommonPageProps(context)),
      submissions,
      session,
    },
  };
};
