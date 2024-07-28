import { useEffect, useState } from "react";

/**
 * This hook is used to create a debounced value for an input field. It takes an `inputValue` and a `delay` as arguments.
 * The hook uses the `useEffect` and `useState` hooks from React to manage the state of the debounced value.
 *
 *
 * ### How it works:
 * - When `inputValue` changes, a new timeout is set with the provided `delay`.
 * - If `inputValue` changes again before the timer completes, the previous timer is cleared and a new one is set.
 * - After the delay, the debounced value is updated to the current `inputValue`.
 *
 * ### Considerations:
 * - This hook will cause re-renders as it updates the state based on the input value.
 * - The debounced value only updates after the specified delay, which can be useful for optimizing performance in situations where rapid changes are made to the input field. like searching for a blog
 *
 */
export function useDebouncedValue(inputValue: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
}
