export function HeadingParagraph({ children }: { children: string }) {
  return (
    <h2 className="text-xl font-bold text-left md:text-3xl">{children}</h2>
  );
}
