import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { StatusMessage } from "@/ui/status-message";

type AuthGateProps = {
  children: React.ReactNode;
  text: string;
  className?: string;
};

export function AuthGate({ children, text, className }: AuthGateProps) {
  const { t } = useTranslation();
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
