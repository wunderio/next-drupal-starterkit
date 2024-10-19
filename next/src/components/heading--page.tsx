export function HeadingPage({ children }: { children: JSX.Element | string }) {
  return <h1 className="font-bold text-left text-md md:text-lg">{children}</h1>;
}
