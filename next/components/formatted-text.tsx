import Image from "next/image";
import Link from "next/link";
import {
  DOMNode,
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import parse from "html-react-parser";
import { isRelative } from "lib/utils";

const isElement = (domNode: DOMNode): domNode is Element =>
  domNode.type === "tag";

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (isElement(domNode)) {
      if (domNode.name === "img") {
        const { src, alt, width = 100, height = 100 } = domNode.attribs;

        const numberWidth = Number(width);
        const numberHeight = Number(height);

        if (isRelative(src)) {
          return (
            <Image
              src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${src}`}
              width={numberWidth}
              height={numberHeight}
              alt={alt}
              style={{
                maxWidth: "100%",
                objectFit: "cover",
              }}
            />
          );
        }
      }

      if (domNode.name === "a") {
        const { href, class: className } = domNode.attribs;

        if (href && isRelative(href)) {
          return (
            <Link href={href} passHref className={className}>
              {domToReact(domNode.children)}
            </Link>
          );
        }
      }

      if (domNode.name === "input") {
        if (domNode.attribs.value === "") {
          delete domNode.attribs.value;
        }

        return domNode;
      }
    }
  },
};

interface FormattedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  format?: string;
  processed: string;
  value?: string;
}

export function FormattedText({ processed, ...props }: FormattedTextProps) {
  return (
    <div data-cy="node--body" {...props}>
      {parse(processed, options)}
    </div>
  );
}
