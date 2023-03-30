export function HeadingParagraph({ children }: { children: string }) {
  return (
    <h2 className="text-left text-heading-md font-bold text-wunderpurple-950 md:text-heading-lg">
      {children}
    </h2>
  );
}
