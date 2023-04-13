import { useSession } from "next-auth/react";
import React from "react";

import InfoIcon from "@/styles/icons/info.svg";

type AuthGateProps = {
  children: JSX.Element;
  text: string;
};

export function AuthGate({ children, text }: AuthGateProps) {
  const { status } = useSession();
  if (status === "authenticated") {
    return <>{children}</>;
  } else {
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
}
