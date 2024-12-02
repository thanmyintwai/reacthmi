/** @type {import('tailwindcss').Config} */

const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      /* container: {
        center: true,  // Centers container automatically
        padding: '1rem',  // Adds default padding (like MUI’s padding)
        screens: {
          sm: '600px',
          md: '960px',
          lg: '1280px',
          xl: '1440px',
        },
      }, */
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

