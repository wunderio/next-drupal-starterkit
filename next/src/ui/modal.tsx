import { useTranslation } from "next-i18next";
import React from "react";
import * as ModalPrimitive from "@radix-ui/react-dialog";
import clsx from "clsx";

import CloseIcon from "@/styles/icons/close.svg";

const Modal = ModalPrimitive.Root;

const ModalTrigger = ModalPrimitive.Trigger;

const ModalPortal = ({
  children,
  ...props
}: ModalPrimitive.DialogPortalProps) => (
  <ModalPrimitive.Portal {...props}>
    <div className="fixed inset-0 z-50 flex items-center justify-center font-overpass">
      {children}
    </div>
  </ModalPrimitive.Portal>
);
ModalPortal.displayName = "ModalPortal";

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof ModalPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Overlay
    ref={ref}
    className={clsx("fixed inset-0 z-50 backdrop-blur-sm", className)}
    {...props}
  />
));
ModalOverlay.displayName = "ModalOverlay";

const ModalContent = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ModalPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { t } = useTranslation();
  return (
    <ModalPortal>
      <ModalOverlay />
      <ModalPrimitive.Content
        ref={ref}
        className={clsx(
          "fixed z-50 grid max-h-[95vh] w-[95vw] max-w-xl gap-4 overflow-y-auto rounded border border-graysuit bg-white px-6 pb-10 pt-12 text-scapaflow shadow-long",
          className,
        )}
        {...props}
      >
        {children}
        <ModalPrimitive.Close className="absolute right-0 top-0 flex items-center bg-mischka px-3 py-2 text-sm font-bold text-steelgray disabled:pointer-events-none">
          {t("modal-close")}
          <CloseIcon className="ml-2 inline-block h-8 w-8" aria-hidden />
        </ModalPrimitive.Close>
      </ModalPrimitive.Content>
    </ModalPortal>
  );
});
ModalContent.displayName = "ModalContent";

const ModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx("flex flex-col space-y-4", className)} {...props} />
);
ModalHeader.displayName = "ModalHeader";

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ModalPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Title
    ref={ref}
    className={clsx(
      "leading-none text-2xl font-semibold tracking-tight text-steelgray",
      className,
    )}
    {...props}
  />
));
ModalTitle.displayName = "ModalTitle";

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ModalPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Description
    ref={ref}
    className={clsx("text-md text-scapaflow", className)}
    {...props}
  />
));
ModalDescription.displayName = "ModalDescription";

export {
  Modal,
  ModalTrigger,
  ModalPortal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
};
