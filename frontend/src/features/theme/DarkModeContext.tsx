import { PropsWithChildren, createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type DarkModeContextValueType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};
type DarkModeProviderProps = PropsWithChildren;

const DarkModeContext = createContext<DarkModeContextValueType | null>(null);

function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useLocalStorage({
    initialState: window.matchMedia("(prefers-color-scheme: dark)").matches,
    key: "isDarkMode",
  });

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add("dark");
    if (isDarkMode) document.documentElement.classList.remove("light");

    if (!isDarkMode) document.documentElement.classList.add("light");
    if (!isDarkMode) document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((darkMode) => !darkMode);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkModeContext() {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error("Dark mode context was called outside of its provider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { useDarkModeContext };
export default DarkModeProvider;
