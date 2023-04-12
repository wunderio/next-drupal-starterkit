import { useSession } from "next-auth/react";
import React from "react";

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
      <p className="mb-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
        {text}
      </p>
    );
  }
}
