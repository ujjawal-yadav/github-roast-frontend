import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily:{
        PlayfairDisplay: ["var(--font-PlayfairDisplay)"],
        Cardo: ["var(--font-Cardo)"],
        Overlock: ["var(--font-Overlock)"],
      },
      screens:{
        'sm': '350px',
      // => @media (min-width: 640px) { ... }

      'md': '600px',
      // => @media (min-width: 768px) { ... }

      'lg': '800px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1000px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1200px',
        
      },

      colors: {
        'custom-color-1': 'hsla(186, 33%, 94%, 1)',
        'custom-color-2': 'hsla(216, 41%, 79%, 1)',
        'custom-color-3': 'hsla(211, 40%, 87%,1)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require('tailwind-scrollbar'),],
};
export default config;
