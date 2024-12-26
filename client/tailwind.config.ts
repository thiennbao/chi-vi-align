/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f9484a",
        secondary: "#fbd72b",
        tertiary: "#fa903a",
        "dark-1": "#1a1a1a",
        "dark-2": "#2a2a2a",
        "dark-3": "#3a3a3a",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(to right, #f9484a, 50%, #fbd72b)",
        "gradient-primary-v": "linear-gradient(to top, #f9484a, 50%, #fbd72b)",
      },
    },
  },
  plugins: [],
};
