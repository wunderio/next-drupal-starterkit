import Image from "next/image";
import Link from "next/link";
import {
  DOMNode,
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import parse from "html-react-parser";

import { isRelative } from "@/lib/utils";

const isElement = (domNode: DOMNode): domNode is Element =>
  domNode.type === "tag";

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (!isElement(domNode)) return;

    switch (domNode.name) {
      case "img": {
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
              className="max-w-full object-cover"
            />
          );
        }
        break;
      }

      case "a": {
        const { href, class: className } = domNode.attribs;

        if (href && isRelative(href)) {
          return (
            <Link href={href} passHref className={className}>
              {domToReact(domNode.children)}
            </Link>
          );
        }
        break;
      }

      case "input": {
        if (domNode.attribs.value === "") {
          delete domNode.attribs.value;
        }

        return domNode;
      }

      default: {
        return undefined;
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
  return <div {...props}>{parse(processed, options)}</div>;
}
