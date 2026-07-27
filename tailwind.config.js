/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ipru: {
          maroon: '#8B1A1A',
          red: '#B71C1C',
          orange: '#F7941D',
          blue: '#003B71',
          darkblue: '#002244',
          lightblue: '#E8F0FE',
        },
        navy: { DEFAULT: '#1A1A2E', 800: '#16213E', 700: '#0F3460' },
        gray: { 50: '#F8F9FA', 100: '#F1F3F5', 200: '#E9ECEF', 400: '#ADB5BD', 600: '#6C757D' },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
