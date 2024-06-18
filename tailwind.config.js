/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#F8F8F2",
        secondary: "#70C92D",
        title_color: "#0E521A",
        backimg: "#EFEFE4",
      },
      fontFamily: {
        headers: ["DosisExtraBold"],
        titles: ["DosisMedium"],
        texts: ["DosisLight"],
      },
      width: {
        85: "22rem",
      },
      padding: {
        98: "25rem",
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      xxl: "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
