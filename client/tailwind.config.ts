/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f9484a",
        dark: "#1a1a1a",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(to right, #f9484a, 50%, #fbd72b)",
      },
    },
  },
  plugins: [],
};
