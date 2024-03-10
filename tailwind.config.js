/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // hsl(var(--color-primary) / <alpha-value>)
        bodyBackgroundColor:
          "hsl(var(--body-background-color) / <alpha-value>)",
        cardBackgroundColor:
          "hsl(var(--card-background-color) / <alpha-value>)",
        textColorMain: "hsl(var(--text-color-main) / <alpha-value>)",
        textColorDark: "hsl(var(--text-color-dark) / <alpha-value>)",
        backgroundColorAlt: "hsl(var(--background-color-alt) / <alpha-value>)",
        textColorAlt: "hsl(var(--body-background-color) / <alpha-value>)",
        borderColor: "hsl(var(--border-color) / <alpha-value>)",
        codeBackgroundColor:
          "hsl(var(--code-background-color) / <alpha-value>)",
        shadowColor: "hsl(var(--shadow-color) / <alpha-value>)",
        // common vars:
        themeColor: "hsl(var(--theme-color) / <alpha-value>)",
        successColor: "hsl(var(--success-color) / <alpha-value>)",
        errorColor: "hsl(var(--error-color) / <alpha-value>)",
        gradientColorOne: "hsl(var(--gradient-color-one) / <alpha-value>)",
        gradientColorTwo: "hsl(var(--gradient-color-two) / <alpha-value>)",
      },
      maxWidth: {
        globalWidthContent: "1360px",
      },
      animation: {
        upAndDown: "upAndDown 4s linear infinite",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/container-queries")],
};
