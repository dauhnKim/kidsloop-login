import React, { useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

import { useAtom } from "jotai";

import { cls } from "../utils/libs";
import { isDarkAtom } from "../utils/store";

const DarkModeToggle = ({ isTop = true, className, size }) => {
  const [isDarkMode, setDarkMode] = useAtom(isDarkAtom);

  const toggleDarkMode = (checked) => {
    checked
      ? localStorage.setItem("mode", "dark")
      : localStorage.setItem("mode", "light");

    setDarkMode(checked);
  };

  useEffect(() => {
    if (localStorage.getItem("mode")) {
      localStorage.getItem("mode") === "dark"
        ? setDarkMode(true)
        : setDarkMode(false);
    }
  }, [isDarkMode]);

  return (
    <DarkModeSwitch
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={isTop ? 30 : size}
      className={cls(isTop ? "absolute top-10 right-10" : className)}
    />
  );
};

export default DarkModeToggle;
