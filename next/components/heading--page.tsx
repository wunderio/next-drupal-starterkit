export function HeadingPage({ children }: { children: JSX.Element | string }) {
  return (
    <h1 className="text-left text-heading-md font-bold text-steelgray md:text-heading-lg">
      {children}
    </h1>
  );
}
