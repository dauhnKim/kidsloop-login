import { Route, Routes } from "react-router-dom";
import i18n from "./i18n";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";

import ThemeProvider from "./components/ThemeProvider";
import { ThemeProvider as TailwindThemeProvider } from "@material-tailwind/react";
import { Suspense, useState } from "react";
import Loader from "./components/Loader";
import LocaleContext from "./LocaleContext";

const App = () => {
  const [locale, setLocale] = useState(i18n.language);

  i18n.on("languageChanged", (lng) => setLocale(i18n.language));

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <Suspense fallback={<Loader />}>
        <TailwindThemeProvider>
          <ThemeProvider>
            <div className="bg-[#f5f5f5] dark:bg-[#272727] dark:text-white w-screen h-screen flex items-center justify-center">
              <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/sign-up" element={<SignUp />} />
              </Routes>
            </div>
          </ThemeProvider>
        </TailwindThemeProvider>
      </Suspense>
    </LocaleContext.Provider>
  );
};

export default App;
