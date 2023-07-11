import React from "react";
import clsx from "clsx";

export type DividerProps = React.HTMLAttributes<HTMLHRElement>;

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, ...props }, ref) => {
    return (
      <hr
        className={clsx(
          "mx-auto my-12 border-t border-finnishwinter",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Divider.displayName = "Divider";
