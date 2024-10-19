export function HeadingPage({ children }: { children: JSX.Element | string }) {
  return (
    <h1 className="text-xl font-bold text-left md:text-4xl">{children}</h1>
  );
}
