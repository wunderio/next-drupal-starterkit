import React, { createContext, useContext } from "react";

type BoundaryProps = {
  levelOverride?: "1" | "2" | "3" | "4" | "5" | "6";
  children: React.ReactNode;
};

type HProps = {
  className?: string;
  [key: string]: any;
};

export const LevelContext = createContext<number>(0);

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

/**
 * Dynamic heading component.
 * An automatic heading management compound component. Keeps
 * track of the heading levels in the application and renders
 * the correct <h> tag.
 *
 * By default, the first level that will be rendered will be
 * <h2>, but this can be overridden by setting the
 * levelOverride prop.
 *
 * @prop {string | number} levelOverride: Optional override
 * prop to hard set the current level.
 *
 * @example
 * <h1>Heading 1</h1>
 * <Heading.Boundary>
 *     <Heading.H>Heading 2</Heading.H>
 *     <Heading.Boundary>
 *          <Heading.H>Heading 3</Heading.H>
 *     </Heading.Boundary>
 *     <Heading.Boundary>
 *          <Heading.H>Heading 3</Heading.H>
 *          <Heading.Boundary>
 *              <Heading.H>Heading 4</Heading.H>
 *          </Heading.Boundary>
 *     </Heading.Boundary>
 * </Heading.Boundary>
 */
export const H: React.FC<HProps> = ({ className, children, ...props }) => {
  const level = useContext(LevelContext);
  const Heading = `h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements;
  const headingProps: React.HTMLAttributes<HTMLElement> = {
    className,
    children,
    ...props,
  };

  return React.createElement(Heading, headingProps);
};

H.displayName = "Heading.H";

export const HeadingLevel = {
  Boundary,
  H,
};
