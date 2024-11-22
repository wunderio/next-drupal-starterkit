import { getTranslations } from "next-intl/server";

import { StatusMessage } from "@/components/ui/status-message";
import { getAuth } from "@/lib/auth/get-auth";

type AuthGateProps = {
  children: React.ReactNode;
  text: string;
  className?: string;
};

export async function AuthGateServer({
  children,
  text,
  className,
}: AuthGateProps) {
  const session = await getAuth();

  if (session) {
    return <>{children}</>;
  }

  const t = await getTranslations();

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
