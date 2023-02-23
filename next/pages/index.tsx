import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode } from "next-drupal";

import { Divider } from "@/components/divider";
import { LatestArticles } from "@/components/latest-articles";
import { Meta } from "@/components/meta";
import { NodeFrontpage } from "@/components/node--frontpage";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { getNodePageJsonApiParams } from "@/lib/get-params";

import { LayoutProps } from "../components/layout";
import { drupal } from "../lib/drupal";

interface IndexPageProps extends LayoutProps {
  articles: DrupalNode[];
  frontpageNode?: DrupalNode;
}

export default function IndexPage({
  articles,
  frontpageNode,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch(`/api/contact`, {
      method: "POST",
      body: JSON.stringify({
        name: event.target.name.value,
        email: event.target.email.value,
        message: event.target.message.value,
        subject: event.target.subject.value,
      }),
    });

    if (response.ok) {
      alert("Thanks!");
    }

    // Handle error.
  }
  return (
    <>
      {frontpageNode && (
        <Meta title={frontpageNode.title} metatags={frontpageNode.metatag} />
      )}

      <NodeFrontpage node={frontpageNode} />
      <Divider />
      <LatestArticles articles={articles} />
      <Divider />
      <div>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit}
          className="borde mb-4 flex flex-col gap-5 rounded bg-white p-4 shadow-md transition-all hover:shadow-md"
        >
          <h2 className="text-left text-heading-md font-bold md:text-heading-lg">
            Contact us!
          </h2>
          <p>
            This form is posting to the default contact webform in Drupal. Try
            it!
          </p>
          <div>
            <label className="mb-2 block text-sm font-bold" htmlFor="name">
              Name:
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3  shadow "
              type="text"
              id="name"
              name="name"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold" htmlFor="email">
              Email:
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 shadow"
              type="email"
              id="email"
              name="email"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold" htmlFor="subject">
              Subject:
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 shadow"
              type="text"
              id="subject"
              name="subject"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold" htmlFor="message">
              Message:
            </label>
            <textarea
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 shadow"
              id="message"
              name="message"
              required
            />
          </div>

          <button
            className="focus:shadow-outline rounded bg-wunderpurple-500 py-2 px-4 font-bold text-white hover:bg-wunderpurple-700"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async (
  context
) => {
  const articles = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--article",
    context,
    {
      params: {
        "filter[status]": 1,
        "filter[langcode]": context.locale,
        "fields[node--article]": "title,path,field_image,uid,created",
        include: "field_image,uid",
        sort: "-created",
      },
    }
  );

  const frontPageNodes = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--frontpage", context, {
    params: getNodePageJsonApiParams("node--frontpage"),
  });

  return {
    props: {
      ...(await getCommonPageProps(context)),
      articles,
      frontpageNode: frontPageNodes[0] || null,
    },
    revalidate: 60,
  };
};
