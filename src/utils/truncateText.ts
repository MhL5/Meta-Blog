/**
 * Truncates the given text string to the specified limit, appending '...' if it exceeds the limit.
 */
export function truncateText(str: string, limit = 100) {
  // if we don't remove code blocks from markdown it will overflow
  const withoutTripleBackticks = str.replace(/```[\s\S]*?```/g, "");

  return withoutTripleBackticks.length > limit
    ? withoutTripleBackticks.slice(0, limit) + "..."
    : withoutTripleBackticks + "...";
}
