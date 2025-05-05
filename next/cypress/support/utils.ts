export function extractLinkFromString(str: string): string | null {
  // Regular expression to match URLs
  const urlRegex: RegExp = /(https?:\/\/[^\s]+)/g;

  // Find matches
  const matches: RegExpMatchArray | null = str.match(urlRegex);

  // Return the first match or null if no match is found
  return matches ? matches[0] : null;
}
