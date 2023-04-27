import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { useTranslation } from "next-i18next";

import { HeadingPage } from "@/components/heading--page";
import { Meta } from "@/components/meta";
import { drupal } from "@/lib/drupal";
import {
  CommonPageProps,
  getCommonPageProps,
} from "@/lib/get-common-page-props";
import { handleRawWebFormSubmission } from "@/lib/utils";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default function DashboardPage({ submission }) {
  const { t } = useTranslation();

  return (
    <>
      <Meta title={t("form-submission-details")} metatags={[]} />
      <HeadingPage>{t("form-submission-details")}</HeadingPage>
      <p className="mt-4 py-4 text-justify text-md/xl text-scapaflow sm:text-lg">
        {t("form-submission-intro-text", { form: submission.formTitle })}
      </p>
      <div>
        <table className="text-graysuit-200 w-full text-left ">
          <thead className="bg-primary-600 uppercase text-primary-100">
            <tr>
              <th className="px-6 py-3">{t("form-field")}</th>
              <th className="px-6 py-3">{t("form-value")}</th>
            </tr>
          </thead>
          <tbody className="border-b bg-white">
            {submission.formData.map(([key, value], i) => (
              <tr key={i}>
                <td className="px-6 py-4">{key}:</td>
                <td className="px-6 py-4">
                  <span className="border-2 border-primary-200 bg-primary-50 p-2">
                    {value}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

  const url = drupal.buildUrl(
    `/webform_rest/${context.params.webformName}/complete_submission/${context.params.webformSubmissionUuid}`
  );

  const result = await drupal.fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Pass the token to authenticate the request:
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  const rawSubmission = await result.json();
  const submission = handleRawWebFormSubmission(rawSubmission);

  return {
    props: {
      ...(await getCommonPageProps(context)),
      submission,
    },
  };
};
