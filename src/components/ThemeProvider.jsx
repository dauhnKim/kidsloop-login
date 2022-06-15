import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";

import { isDarkAtom } from "../utils/store";
import DarkModeToggle from "./DarkModeToggle";

export default function ThemeProvider({ children }) {
  const isDark = useAtomValue(isDarkAtom);
  const [theme, setTheme] = useState(isDark ? "dark" : "light");

  useEffect(() => {
    isDark ? setTheme(`dark`) : setTheme(`light`);
  }, [isDark]);

  return (
    <div className={`${theme}`}>
      <DarkModeToggle />
      {children}
    </div>
  );
}
