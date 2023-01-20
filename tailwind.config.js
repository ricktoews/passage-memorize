/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'my-layout': '1fr 3fr'
      },
      fontFamily: {
        memorize: ['Varela Round']
      }
    },
  },
  plugins: [],
}
