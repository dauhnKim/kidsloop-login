const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
    colors: {
      primary: "#3379ce",
      secondary: "#17377b",
    },
  },
  plugins: [require("flowbite/plugin")],
});
