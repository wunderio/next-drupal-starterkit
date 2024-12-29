export function HeadingParagraph({ children }: { children: string }) {
  return (
    <h2 className="text-left text-xl font-bold md:text-3xl">{children}</h2>
  );
}
