/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      xs: "414px",
      sm: "768px",
      md: "1022px",
      lg: "1092px",
      xl: "1280px",
    },
    extend: {
      colors: {
        dim: {
          50: "#5F99F7",
          100: "#5F99F7",
          200: "#38444D",
          300: "#202E3A",
          400: "#253341",
          500: "#5F99F7",
          600: "#5F99F7",
          700: "#192734",
          800: "#162d40",
          900: "#15202b",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
  variants: {
    // ...
    scrollbar: ["dark"],
  },
  corePlugins: {
    preflight: true, // 禁止tailwindcss的默认属性base，防止和ant design vue的样式产生冲突
  },
};
