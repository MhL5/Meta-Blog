export function truncateText(str: string, limit = 100) {
  return str.length > limit ? str.slice(0, limit) + "..." : str;
}
