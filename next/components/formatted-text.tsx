import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";
import {
  DOMNode,
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import parse from "html-react-parser";

import { isRelative } from "@/lib/utils";

import { env } from "@/env";

const isElement = (domNode: DOMNode): domNode is Element =>
  domNode instanceof Element;

const options: HTMLReactParserOptions = {
  /*
   * If `undefined` is returned from this `replace` function, nothing is changed and the given DOMNode is rendered as usual.
   * But if anything else is returned, that value replaces the original value.
   * For example, return `null` to remove it, or some other component to replace it.
   */
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
              src={`${env.NEXT_PUBLIC_DRUPAL_BASE_URL}${src}`}
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
        const { href } = domNode.attribs;

        if (href && isRelative(href)) {
          return (
            <Link href={href} className="hyperlink underline">
              {domToReact(domNode.children as DOMNode[], options)}
            </Link>
          );
        }
        break;
      }

      case "p": {
        return (
          <p className="mb-2">
            {domToReact(domNode.children as DOMNode[], options)}
          </p>
        );
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

interface FormattedTextProps extends HTMLAttributes<HTMLDivElement> {
  html: string;
}

export function FormattedText({ html, ...props }: FormattedTextProps) {
  return <div {...props}>{parse(html, options)}</div>;
}
