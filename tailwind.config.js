/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Cardo: ['Cardo', 'sans-serif'],
        Philosopher: ['Philosopher', 'sans-serif'],
      },
      fontWeight: {
        sub: 700,
      },
    },
  },
  plugins: [],
};
