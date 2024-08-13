/**
 * Simple function to convert markdown to text
 *
 * useful for turning article contents into a text description for html page meta tag description
 */
type MarkdownToText = {
  markdown: string;
  options: { slice: [number, number] };
};

export function markdownToText({
  markdown,
  options: { slice },
}: MarkdownToText): string {
  return markdown
    .slice(slice[0], slice[1])
    .replaceAll("#", "") // Remove headers
    .replaceAll(/\*\*|\__/g, "") // Remove bold
    .replaceAll(/\*|_/g, "") // Remove italics
    .replaceAll(/\[[^\]]*\]\(([^)]+)\)/g, "$1") // Remove links
    .replaceAll(/^> /gm, "") // Remove block quotes
    .replaceAll(/`[^`]*`/g, "") // Remove code spans
    .replaceAll(/^---+$/gm, "") // Remove horizontal rules
    .replaceAll("`", "") // Remove code blocks
    .trim();
}
