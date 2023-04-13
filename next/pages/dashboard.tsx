import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";

import { HeadingPage } from "@/components/heading--page";
import { drupal } from "@/lib/drupal";
import {
  CommonPageProps,
  getCommonPageProps,
} from "@/lib/get-common-page-props";

import { authOptions } from "./api/auth/[...nextauth]";

export default function DashboardPage({ submissions }) {
  const { data } = useSession();
  const tableRows = submissions.map((submission) => (
    <tr key={submission.uuid[0]["value"]}>
      <td className="px-6 py-4">{submission.webform_id[0]["target_id"]}</td>
      <td className="px-6 py-4">{submission.uuid[0]["value"]}</td>
      <td className="px-6 py-4">{submission.created[0]["value"]}</td>
    </tr>
  ));

  return (
    <>
      <HeadingPage>{data.user.name}'s dashboard</HeadingPage>
      <p className="py-4">
        Hello <strong>{data.user.name}</strong>! Here's your form submissions:
      </p>
      <table className="text-graysuit-200 w-full text-left ">
        <thead className="bg-primary-600 uppercase text-primary-100">
          <tr>
            <th className="px-6 py-3">Webform id</th>
            <th className="px-6 py-3">Submission uuid</th>
            <th className="px-6 py-3">Created at</th>
          </tr>
        </thead>
        <tbody className="border-b bg-white">{tableRows}</tbody>
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

  const submissions = await result.json();

  return {
    props: {
      ...(await getCommonPageProps(context)),
      submissions,
      session,
    },
  };
};
