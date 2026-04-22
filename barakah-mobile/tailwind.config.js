/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        nb: {
          dark: "#0A0E17",
          surface: "#141922",
          card: "#1C2333",
          green: "#00D4AA",
          gold: "#D4A843",
          accent: "#4F8CFF",
          red: "#FF4757",
          text: "#F0F2F5",
          muted: "#6B7B8D",
        },
      },
      fontFamily: {
        sans: ["System"],
      },
    },
  },
  plugins: [],
};
