export function HeadingPage({ children }: { children: JSX.Element | string }) {
  return (
    <h1 className="text-left text-xl font-bold md:text-4xl">{children}</h1>
  );
}
