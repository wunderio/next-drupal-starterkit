import React from "react";
import { cva } from "cva";

import { capitalise, cn } from "@/lib/utils";
import SuccessIcon from "@/styles/icons/checkmark.svg";
import ErrorIcon from "@/styles/icons/error.svg";
import WarningIcon from "@/styles/icons/warning.svg";

export const variants = /* className */ cva(
  "text-md text-steelgray w-full relative py-6 px-16",
  {
    variants: {
      level: {
        info: "bg-info/15",
        success: "bg-success/15",
        warning: "bg-warning/15",
        error: "bg-error/15",
      },
    },
    defaultVariants: {
      level: "info",
    },
  }
);

export interface StatusMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  level?: "info" | "success" | "warning" | "error";
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

export const StatusMessage = React.forwardRef<
  HTMLDivElement,
  StatusMessageProps
>(({ level = "info", title, className, children, ...props }, ref) => {
  const Icon = {
    info: WarningIcon,
    success: SuccessIcon,
    warning: WarningIcon,
    error: ErrorIcon,
  }[level];
  const iconColor = {
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    error: "text-error",
  }[level];
  const computedTitle =
    title ?? `${level.charAt(0).toUpperCase()}${level.slice(1)}`;

  return (
    <div
      role="alert"
      className={cn(variants({ level, className }))}
      ref={ref}
      {...props}
    >
      <Icon className={cn("absolute left-6 top-6 h-6 w-6", iconColor)} />
      <h3 className="mb-2 text-md font-bold">{computedTitle}</h3>
      {children}
    </div>
  );
});
StatusMessage.displayName = "StatusMessage";
