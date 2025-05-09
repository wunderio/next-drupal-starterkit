"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { StatusMessage } from "@/components/ui/status-message";

type AuthGateProps = {
  children: React.ReactNode;
  text: string;
  className?: string;
};

export function AuthGateClient({ children, text, className }: AuthGateProps) {
  const t = useTranslations();
  const { status } = useSession();

  if (status === "authenticated") {
    return <>{children}</>;
  }

  return (
    <StatusMessage
      level="warning"
      title={t("you-are-not-logged-in")}
      className={className}
    >
      {text}
    </StatusMessage>
  );
}
