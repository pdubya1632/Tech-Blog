/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.{html,js,handlebars}',
    './public/**/*.{css,js}',
    './src/**/*.{css,js}',
  ],
  theme: {
    themeVariants: ['dark'],
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
