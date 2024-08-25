export function HeadingPage({ children }: { children: JSX.Element | string }) {
  return (
    <h1 className="font-bold text-left text-heading-md text-steelgray md:text-heading-lg">
      {children}
    </h1>
  );
}
