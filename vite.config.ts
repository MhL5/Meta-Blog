import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// @ts-expect-error vite-plugin-eslint types are broken, it works fine
// the only workaround is to ignore the type definitions until it gets fixed in the feature updates
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
});
