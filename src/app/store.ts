import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/toggleThemeSlice";
import { authApiSlice } from "../features/Auth/AuthApiSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
