import React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import clsx from "clsx";

import Checkmark from "@/styles/icons/checkmark.svg";

import css from "./checkbox.module.css";

type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
>;

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={clsx(
      css.checkbox,
      "peer h-5 w-5 shrink-0 rounded border border-scapaflow",
      "disabled:cursor-not-allowed disabled:border-graysuit",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center">
      <Checkmark />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = "Checkbox";
