import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'base': {
          '400': '#d9a5a5',
        },
        'sub': {
          '300': '#bdbdb4',
          '400': '#a19f94',
          '500': '#8f8c80',
        },
        'softblack': {
          '900': '#4a3f35',
        },
        'text': {
          '900': '#333333',
        },
        'support': {
          '100': '#f5ede0',
        },
      },
    },
  },
  plugins: [],
};
export default config;
