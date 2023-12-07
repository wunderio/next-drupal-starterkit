export default async function Page() {
  const asyncData = await Promise.resolve(
    new Date().toLocaleTimeString("en-FI", { timeZone: "Europe/Helsinki" }),
  );
  return <div>Test page using app router. {asyncData}</div>;
}
