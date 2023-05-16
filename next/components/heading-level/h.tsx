import { forwardRef } from "react";

import { LevelContext } from "./context";

const H = forwardRef((props, ref) => (
  <LevelContext.Consumer>
    {(level) => {
      const Heading = `h${Math.min(level, 6)}`;
      return (
        <Heading className={props && props.className} ref={ref} {...props} />
      );
    }}
  </LevelContext.Consumer>
));

H.displayName = "Heading.H";

export default H;
/*
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
*/
/*
import React, { forwardRef, ReactNode, useContext } from "react";
import { createContext } from "react";
import PropTypes from "prop-types";

export const LevelContext = createContext<number>(0);

interface HeadingProps {
  className?: string;
}

interface BoundaryProps {
  levelOverride?: "1" | "2" | "3" | "4" | "5" | "6";
  children?: ReactNode;
}

interface HProps extends HeadingProps {
  children?: ReactNode;
}

type HeadingComponent = React.ForwardRefExoticComponent<
  HProps & React.RefAttributes<HTMLElement>
>;

export const Boundary: React.FC<BoundaryProps> = ({
  children,
  levelOverride,
}) => {
  const level = useContext(LevelContext);
  const updatedLevel = levelOverride ? parseInt(levelOverride, 10) : level + 1;

  return (
    <LevelContext.Provider value={updatedLevel}>
      {children}
    </LevelContext.Provider>
  );
};

Boundary.displayName = "Heading.Boundary";

Boundary.propTypes = {
  levelOverride: PropTypes.oneOf(["1", "2", "3", "4", "5", "6"]),
  children: PropTypes.any,
};

export const H: HeadingComponent = forwardRef<HTMLElement, HProps>(
  ({ className, ...props }, ref) => {
    const level = useContext(LevelContext);
    const Heading = `h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements;
    const headingProps: React.HTMLAttributes<HTMLElement> = {
      className,
      ...props,
    };

    return React.createElement(Heading, { ...headingProps, ref });
  }
);

H.displayName = "Heading.H";

export default H;
*/
