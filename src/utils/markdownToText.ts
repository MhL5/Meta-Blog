type MarkdownToText = {
  markdown: string;
  options: { slice: [number, number] };
};

/**
 * Converts a Markdown string to plain text, removing various Markdown formatting elements.
 *
 * @param markdown - The Markdown string to convert.
 * @param options - Options for the conversion, including a slice range to apply.
 * @param options.slice - A tuple specifying the start and end indices of the Markdown string to convert.
 * @returns The plain text version of the specified Markdown string, with formatting removed.
 */
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
