import React, {
  ElementType,
  forwardRef,
  PropsWithChildren,
  useContext,
} from "react";
import PropTypes, { Requireable } from "prop-types";

import { LevelContext } from "./context";

type HTMLTag = string & { __htmlTag: never }; // Custom type to represent HTML tag names

type Props = {
  className?: string;
  as?: HTMLTag;
};

const H = forwardRef<HTMLHeadingElement, PropsWithChildren<Props>>(
  (props, ref) => {
    const { as: Component = "h2", className, children } = props;
    const level = useContext(LevelContext);
    const levelCapped = Math.min(level, 6);
    const As = Component as ElementType;
    return (
      <As className={className} ref={ref} as={`h${levelCapped}`}>
        {children}
      </As>
    );
  }
);

H.displayName = "Heading.H";

H.propTypes = {
  className: PropTypes.string,
  as: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]) as Requireable<HTMLTag>,
};

export default H;
