import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'gc-dark': '#14213d', // GreenConnect Dark Blue/Black
        'gc-green': '#00d1b2', // GreenConnect Primary Accent
        'gc-light-bg': '#f5f7fa', // Light background for the content area
      },
    },
  },
  plugins: [],
};
export default config;