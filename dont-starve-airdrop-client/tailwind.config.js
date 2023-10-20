const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["belisa_plumilla", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
};
