/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black.5': 'rgba(0, 0, 0, 0.5)',
        'green': 'rgb(0,100,0,1)',
        'lightgreen': 'rgb(35,120,85,0.9)'
      }
    },
  },
  plugins: [],
}