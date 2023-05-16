import Link from "next/link";
import clsx from "clsx";

import { FormattedText } from "@/components/formatted-text";
import Heading from "@/components/heading-level/heading";
import { MediaImage } from "@/components/media--image";
import { Hero as HeroType } from "@/lib/zod/paragraph";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

import { withButtonStyles } from "@/wunder-component-library/button";

export const LinkButtonWithStyles = withButtonStyles<any>(Link);

export function ParagraphHero({ paragraph }: { paragraph: HeroType }) {
  return (
    <section id="hero" className="bg-secondary-50">
      <div className="mx-auto grid max-w-screen-xl lg:grid-cols-12">
        <div className="mr-auto place-self-center px-8 py-8 lg:col-span-6  lg:py-16">
          {paragraph.field_heading && (
            <Heading.H className="leading-none mb-4 max-w-2xl text-left text-heading-md font-bold tracking-tight text-primary-600 md:text-heading-lg">
              {paragraph.field_heading}
            </Heading.H>
          )}
          <FormattedText
            html={paragraph.field_formatted_text.processed}
            className={clsx(
              "mb-6 max-w-2xl text-left text-md/xl text-primary-600 sm:text-lg md:text-lg lg:mb-8 lg:text-xl",
              paragraph.field_heading && "mt-4"
            )}
          />
          <div className="gap-4 sm:text-left">
            {paragraph.field_primary_link && (
              <LinkButtonWithStyles
                href={paragraph.field_primary_link.full_url}
                className="text-base mr-4 inline-flex px-5 py-3"
                variant="primary"
              >
                {paragraph.field_primary_link.title}
                <ArrowIcon
                  aria-hidden
                  className="bg:white ml-3 h-6 w-6 -rotate-90"
                />
              </LinkButtonWithStyles>
            )}

            {paragraph.field_secondary_link && (
              <LinkButtonWithStyles
                href={paragraph.field_secondary_link.full_url}
                className="text-base mt-3 inline-flex px-5 py-3 sm:mt-0"
                variant="secondary"
              >
                {paragraph.field_secondary_link.title}
                <ArrowIcon
                  aria-hidden
                  className="bg:white ml-3 h-6 w-6 -rotate-90"
                />
              </LinkButtonWithStyles>
            )}
          </div>
        </div>
        <div className="hidden lg:col-span-6 lg:mt-0 lg:flex">
          <MediaImage media={paragraph.field_image} priority />
        </div>
      </div>
    </section>
  );
}
