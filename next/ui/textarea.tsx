import React from "react";
import clsx from "clsx";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={clsx(
          "flex w-full items-center rounded border-2 border-stone bg-white px-2 py-1.5 text-md text-steelgray",
          "placeholder:text-stone",
          "hover:enabled:border-steelgray",
          "focus:border-primary-600 active:enabled:border-primary-600",
          "disabled:cursor-not-allowed disabled:border-finnishwinter disabled:bg-finnishwinter disabled:text-finnishwinter",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";
