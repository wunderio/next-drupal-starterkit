"use client"; // Error components must be Client Components

import { useEffect } from "react";

import ErrorPage from "@/components/error-page";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <ErrorPage />;
}
