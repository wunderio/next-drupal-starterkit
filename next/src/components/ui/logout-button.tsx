"use client";

import { signOut } from "next-auth/react";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    void signOut();
  };

  return (
    <span
      onClick={onClick}
      className="cursor-pointer"
      data-test-id="logout-button"
      aria-label="Logout button"
    >
      {children}
    </span>
  );
};
