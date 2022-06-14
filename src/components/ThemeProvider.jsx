import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";

import { isDarkAtom } from "../utils/store";
import DarkModeToggle from "./DarkModeToggle";

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(`light`);
  const isDark = useAtomValue(isDarkAtom);

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
