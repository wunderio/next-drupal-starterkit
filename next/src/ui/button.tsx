import React from "react";
import clsx from "clsx";
import { cva } from "cva";

export const buttonVariants = cva(
  "flex justify-center items-center border-2 rounded transition-colors duration-200 active:scale-[0.98] disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: [
          "bg-primary-600 border-primary-600 text-white",
          "hover:bg-white hover:text-primary-600",
          "active:bg-white active:text-primary-600",
          "disabled:!border-primary-200 disabled:!text-white disabled:!bg-primary-200",
        ],
        secondary: [
          "bg-white text-primary-600 border-primary-600",
          "hover:bg-primary-600 hover:text-white",
          "active:bg-primary-600 active:text-white",
          "disabled:!border-primary-200 disabled:!text-primary-200 disabled:!bg-white",
        ],
        tertiary: [
          "bg-transparent text-primary-600 border-transparent",
          "hover:bg-primary-50 hover:text-primary-600 hover:border-transparent",
          "active:bg-primary-50 active:text-primary-600 active:border-transparent",
          "disabled:!border-transparent disabled:!text-primary-200",
        ],
      },
      size: {
        sm: "text-sm py-2 px-2.5",
        md: "text-md py-2.5 px-4",
        lg: "text-lg py-3 px-6",
      },
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", children, className, ...props },
    ref,
  ) => {
    return (
      <button
        className={clsx(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
