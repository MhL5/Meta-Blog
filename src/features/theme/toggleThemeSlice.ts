import { createSlice } from "@reduxjs/toolkit";

type toggleThemeState = {
  isDarkMode: string;
};

const initialState: toggleThemeState = {
  isDarkMode: isDarkMode(),
};

export const toggleThemeSlice = createSlice({
  name: "isDarkMode",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isDarkMode = state.isDarkMode === "true" ? "false" : "true";
    },
  },
});


function isDarkMode(): string {
  let isDarkMode;

  if (localStorage.getItem("isDarkMode"))
    isDarkMode = localStorage.getItem("isDarkMode");
  else if (window.matchMedia("(prefers-color-scheme: dark)").matches)
    isDarkMode = `true`;
  else isDarkMode = `false`;

  return isDarkMode || "true";
}

export const { toggleTheme } = toggleThemeSlice.actions;
export default toggleThemeSlice.reducer;
