import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/toggleThemeSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware().concat(dogApiSlice.middleware);
  // },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
