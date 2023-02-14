import clsx from "clsx";

import { inter, overpass } from "@/pages/_app";

const fontVariableClasses = [inter, overpass].map((font) => font.variable);

export function Fonts({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={clsx(
        fontVariableClasses, // Add font variables so they can be used for styling
        "font-overpass" // Default font
      )}
    >
      {children}
    </div>
  );
}
