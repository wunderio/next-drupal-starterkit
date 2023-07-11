import * as React from "react";
import clsx from "clsx";
import { cva } from "cva";

const badgeVariants = cva(
  "border font-semibold inline rounded text-md transition-colors uppercase tracking-wide cursor-arrow",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-600 border-primary-600 hover:bg-white hover:text-primary-600 text-white",
        secondary:
          "bg-secondary-700 border-secondary-700 hover:bg-white hover:text-secondary-700 text-white",
        success:
          "bg-success border-success hover:bg-white hover:text-success text-white",
        error:
          "bg-error border-error hover:bg-white hover:text-error text-white",
        warning:
          "bg-warning border-warning hover:bg-white hover:text-warning text-white",
        info: "bg-info border-info hover:bg-white hover:text-info text-white",
      },
      size: {
        sm: "px-1.5 py-0.5 text-sm",
        md: "px-2 py-1 text-md",
        lg: "px-3 py-2 text-lg",
      },
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: BadgeProps) {
  return (
    <div
      className={clsx(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </div>
  );
}
