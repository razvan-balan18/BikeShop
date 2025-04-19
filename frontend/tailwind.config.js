/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["dim"],
  },
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
}

