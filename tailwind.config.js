/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{html,js,ts,jsx,tsx}',
    './src/index.html',
    './src/index.js',
    './src/styles/app.scss',
    './dist/*.{html,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
