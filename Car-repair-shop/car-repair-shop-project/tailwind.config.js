/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'light': '#FFFFFF', // Specify your desired light background color
      },
    },
  },
  plugins: [require("daisyui")],
}

