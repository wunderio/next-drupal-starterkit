import { getTranslations } from "next-intl/server";

import { auth } from "@/auth";
import { StatusMessage } from "@/ui/status-message";

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
  const session = await auth();

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
