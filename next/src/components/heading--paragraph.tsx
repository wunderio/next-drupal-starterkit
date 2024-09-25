export function HeadingParagraph({ children }: { children: string }) {
  return (
    <h2 className="font-bold text-left text-heading-md text-steelgray md:text-heading-lg">
      {children}
    </h2>
  );
}
