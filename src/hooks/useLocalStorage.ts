import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

type UseLocalStorageParams<T> = { initialState: T; key: string };
type UseLocalStorageReturn<T> = [T, Dispatch<SetStateAction<T>>];
function useLocalStorage<T>({
  initialState,
  key,
}: UseLocalStorageParams<T>): UseLocalStorageReturn<T> {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}

export { useLocalStorage };
