import type { Redirect } from "next";

export function redirectExpiredSessionToLoginPage(
  locale: string,
  callbackUrl: string,
) {
  const redirect: Redirect = {
    destination: `/${locale}/auth/login?logout=true&callbackUrl=${encodeURIComponent(
      callbackUrl,
    )}`,
    permanent: false,
  };

  return { redirect };
}
