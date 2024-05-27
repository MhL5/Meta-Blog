export function convertToCamelCase<T extends string>(input: T): T {
  const words = input.split(" ");
  const camelCasedWords = words.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return camelCasedWords.join("") as T;
}