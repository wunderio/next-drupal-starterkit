import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";

import { HeadingPage } from "@/components/heading--page";
import { drupal } from "@/lib/drupal";
import {
  CommonPageProps,
  getCommonPageProps,
} from "@/lib/get-common-page-props";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default function DashboardPage({ submission }) {
  return (
    <>
      <HeadingPage>Webform submission</HeadingPage>
      <p>
        Here's the data you entered into the <strong>{submission.title}</strong>{" "}
        form:
      </p>
      <div>
        <table className="text-graysuit-200 w-full text-left ">
          <thead className="bg-primary-600 uppercase text-primary-100">
            <tr>
              <th className="px-6 py-3">Key</th>
              <th className="px-6 py-3">Value</th>
            </tr>
          </thead>
          <tbody className="border-b bg-white">
            {Object.entries(submission.webform_submission).map(
              ([key, value], i) => (
                <tr key={i}>
                  <td className="px-6 py-4">{key}</td>
                  <td className="px-6 py-4">{value}</td>
                </tr>
              )
            )}
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

  const submission = await result.json();

  return {
    props: {
      ...(await getCommonPageProps(context)),
      submission,
    },
  };
};
