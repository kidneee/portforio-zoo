/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './templates/**/*.html', './src/**/*.js'],
  theme: {
    screens: {
      sm: '640px',
      md: '769px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
