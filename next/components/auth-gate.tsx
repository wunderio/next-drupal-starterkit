import { useSession } from "next-auth/react";

import InfoIcon from "@/styles/icons/info.svg";

type AuthGateProps = {
  children: React.ReactNode;
  text: string;
};

export function AuthGate({ children, text }: AuthGateProps) {
  const { status } = useSession();

  if (status === "authenticated") {
    return children;
  }

  return (
    <div
      className="relative rounded border border-secondary-900 bg-secondary-200 px-4 py-3 text-secondary-900"
      role="alert"
    >
      <InfoIcon className="mr-2 inline h-6 w-6" />
      <span>{text}</span>
    </div>
  );
}
