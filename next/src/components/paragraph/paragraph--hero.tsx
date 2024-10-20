import { FormattedText } from "@/components/formatted-text";
import { MediaImage } from "@/components/media/media--image";

import type {
  FragmentMediaImageFragment,
  FragmentParagraphHeroFragment,
} from "@/lib/gql/graphql";
import { cn } from "@/lib/utils";

import { ArrowLinkButton } from "../ui/arrow-link-button";

export function ParagraphHero({
  paragraph,
}: {
  paragraph: FragmentParagraphHeroFragment;
}) {
  return (
    <section
      id="hero"
      className="bg-accent"
      data-paragraph={paragraph.__typename}
    >
      <div className="grid max-w-screen-xl mx-auto lg:grid-cols-12">
        <div className="px-8 py-8 mr-auto place-self-center lg:col-span-6 lg:py-16">
          {paragraph.paragraphHeroHeading && (
            <h1 className="max-w-2xl mb-4 text-2xl font-bold leading-none tracking-tight text-left text-primary md:text-5xl">
              {paragraph.paragraphHeroHeading}
            </h1>
          )}
          <FormattedText
            html={paragraph.formattedText.processed}
            className={cn(
              "mb-6 max-w-2xl text-left text-md/xl text-primary sm:text-lg md:text-lg lg:mb-8 lg:text-xl",
              paragraph.formattedText && "mt-4",
            )}
          />
          <div className="gap-4 mt-3 sm:text-left sm:mt-0">
            {paragraph.primaryLink && (
              <ArrowLinkButton
                variant="default"
                href={paragraph.primaryLink.url}
                className="mr-4"
              >
                {paragraph.primaryLink.title}
              </ArrowLinkButton>
            )}

            {paragraph.secondaryLink && (
              <ArrowLinkButton
                variant="outline"
                href={paragraph.secondaryLink.url}
              >
                {paragraph.secondaryLink.title}
              </ArrowLinkButton>
            )}
          </div>
        </div>
        <div className="hidden lg:col-span-6 lg:mt-0 lg:flex">
          <MediaImage
            media={paragraph.image as FragmentMediaImageFragment}
            priority
          />
        </div>
      </div>
    </section>
  );
}
