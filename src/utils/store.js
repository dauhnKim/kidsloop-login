const { atom } = require("jotai");

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const localTheme = localStorage.getItem("mode");

export const isDarkAtom = atom(
  localTheme || localTheme === "dark" ? "dark" : prefersDark ? "dark" : "light"
);
