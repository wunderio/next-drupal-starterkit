import { GetServerSideProps } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { HeadingPage } from "@/components/heading--page";
import { Meta } from "@/components/meta";
import { drupal } from "@/lib/drupal";
import {
  CommonPageProps,
  getCommonPageProps,
} from "@/lib/get-common-page-props";
import { formatDate, handleWebFormSubmissionViewResult } from "@/lib/utils";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default function DashboardPage({ submissions }) {
  const { t } = useTranslation();
  const { data } = useSession();

  return (
    <>
      <Meta title={t("user-dashboard")} metatags={[]} />
      <HeadingPage>{t("user-dashboard")}</HeadingPage>
      <p className="mt-4 py-4 text-justify text-md/xl text-scapaflow sm:text-lg">
        {t("user-dashboard-intro-greeting", { username: data.user.name })}
      </p>
      <table className="text-graysuit-200 w-full text-left ">
        <thead className="bg-primary-600 uppercase text-primary-100">
          <tr>
            <th className="px-6 py-3">{t("form")}</th>
            <th className="px-6 py-3">{t("date")}</th>
            <th className="px-6 py-3">{t("more-details")}</th>
          </tr>
        </thead>
        <tbody className="border-b bg-white">
          {submissions.length > 0 &&
            submissions.map((submission) => (
              <tr key={submission.uuid[0]["value"]}>
                <td className="px-6 py-4">
                  {submission.webform_id[0]["target_id"]}
                </td>
                <td className="px-6 py-4">
                  {formatDate(submission.created[0]["value"])}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/dashboard/webforms/${submission.webform_id[0]["target_id"]}/${submission.uuid[0]["value"]}`}
                  >
                    {t("see-more-details")}
                  </Link>
                </td>
              </tr>
            ))}

          {submissions.length === 0 && (
            <tr>
              <td colSpan={3}>
                <p className="p-4 text-center text-scapaflow">
                  {t("no-submissions-yet")}
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<CommonPageProps> = async (
  context
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const url = drupal.buildUrl("/rest/my-webform-submissions?_format=json");

  const result = await drupal.fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Pass the token to authenticate the request:
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  const submissionsViewResult = await result.json();
  const submissions = handleWebFormSubmissionViewResult(submissionsViewResult);

  return {
    props: {
      ...(await getCommonPageProps(context)),
      submissions,
      session,
    },
  };
};
