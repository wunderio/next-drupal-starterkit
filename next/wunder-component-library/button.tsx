import React from "react";
import { cva } from "cva";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "flex justify-center items-center border-2 rounded transition-colors duration-200 active:enabled:scale-[0.98] disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: [
          "bg-primary-600 border-primary-600 text-white",
          "hover:enabled:bg-white hover:enabled:text-primary-600",
          "active:enabled:bg-white active:enabled:text-primary-600",
          "disabled:border-primary-200 disabled:text-white disabled:bg-primary-200",
        ],
        secondary: [
          "bg-white text-primary-600 border-primary-600",
          "hover:enabled:bg-primary-600 hover:enabled:text-white",
          "active:enabled:bg-primary-600 active:enabled:text-white",
          "disabled:border-primary-200 disabled:text-primary-200 disabled:bg-white",
        ],
        tertiary: [
          "bg-transparent text-primary-600 border-transparent",
          "hover:enabled:bg-primary-50 hover:enabled:text-primary-600 hover:enabled:border-transparent",
          "active:enabled:bg-primary-50 active:enabled:text-primary-600 active:enabled:border-transparent",
          "disabled:border-transparent disabled:text-primary-200",
        ],
      },
      size: {
        sm: "text-sm py-2 px-2.5",
        md: "text-md py-2.5 px-4",
        lg: "text-lg py-3 px-6",
      },
    },
  }
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
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// This is a higher-order component (HOC) that takes a component and returns a new component with the Wunder component library button styles applied.

interface WithButtonStylesProps {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: ButtonProps["className"];
}

export function withButtonStyles<P extends WithButtonStylesProps>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> {
  const WithButtonStyles: React.FC<P> = (props) => {
    const {
      variant = "primary",
      size = "sm",
      className,
      ...otherProps
    } = props;
    const buttonClasses = buttonVariants({ variant, size });

    return (
      <WrappedComponent
        className={cn(buttonClasses, className)}
        {...(otherProps as P)}
      />
    );
  };

  WithButtonStyles.displayName = `withButtonStyles(${
    WrappedComponent.displayName || WrappedComponent.name || "WrappedComponent"
  })`;

  return WithButtonStyles;
}
