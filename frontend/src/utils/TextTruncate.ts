export function textTruncate(text: string, maxLength: number): string {
  // Guard Clause:
  if (text.length < maxLength) return text;

  const textSlice = text.slice(0, maxLength).split(" ");
  textSlice.pop();

  return textSlice.join(" ") + "...";
}
