import React from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

import { useAtom } from "jotai";
import { isDarkAtom } from "../utils/store";
import { cls } from "../utils/libs";

const DarkModeToggle = ({ isTop = true, className, size }) => {
  const [isDarkMode, setDarkMode] = useAtom(isDarkAtom);
  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

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
