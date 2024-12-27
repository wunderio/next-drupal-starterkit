import { FormattedText } from "@/components/formatted-text";
import { MediaImage } from "@/components/media/media--image";
import { ArrowLinkButton } from "@/components/ui/arrow-link-button";
import type {
  FragmentMediaImageFragment,
  FragmentParagraphHeroFragment,
} from "@/lib/gql/graphql";
import { cn } from "@/lib/utils";

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
      <div className="mx-auto grid max-w-screen-xl lg:grid-cols-12">
        <div className="mr-auto place-self-center px-8 py-8 lg:col-span-6 lg:py-16">
          {paragraph.paragraphHeroHeading && (
            <h1 className="mb-4 max-w-2xl text-left text-2xl font-bold leading-none tracking-tight text-primary md:text-5xl">
              {paragraph.paragraphHeroHeading}
            </h1>
          )}
          <FormattedText
            html={paragraph.formattedText.processed}
            className={cn(
              "text-md/xl mb-6 max-w-2xl text-left text-primary sm:text-lg md:text-lg lg:mb-8 lg:text-xl",
              paragraph.formattedText && "mt-4",
            )}
          />
          <div className="mt-3 gap-4 sm:mt-0 sm:text-left">
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
