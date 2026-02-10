// /** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";


const tailwindconfig = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

const combinedConfig = {
  ...defaultTheme, //Merge defaultTheme
  ...tailwindconfig
}

export default combinedConfig;