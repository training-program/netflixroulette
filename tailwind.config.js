/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#555555',
        primary: ' #F65261',
        ghost: '#606060',
        input: '#323232f2',
        bgray: '#979797',
      },
    },
  },
  plugins: [],
};
