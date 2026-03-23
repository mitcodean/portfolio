import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#2A3D45",      // Charcoal Blue
          steel: "#829399",     // Cool Steel
          cream: "#EFC88B",     // Apricot Cream
          burgundy: "#74121D",  // Burgundy
          chestnut: "#823329",  // Chestnut
          white: "#FAFAFA",     // White
        },
      },
    },
  },
  plugins: [],
}

export default config