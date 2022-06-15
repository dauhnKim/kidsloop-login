import { useTranslation } from "react-i18next";
import React, { useContext, useEffect, useState } from "react";
import { Option, Select } from "@material-tailwind/react";

import { useAtomValue } from "jotai";

import { cls } from "../utils/libs";
import { isDarkAtom } from "../utils/store";

import i18n from "../i18n";
import LocaleContext from "../LocaleContext";

const LangSelect = () => {
  const { locale } = useContext(LocaleContext);

  const [value, setValue] = useState("default");
  const [isClicked, setIsClicked] = useState(false);

  const { t } = useTranslation();
  const isDark = useAtomValue(isDarkAtom);

  const changeLocale = (l) => {
    if (locale !== l) {
      i18n.changeLanguage(l);
    }
  };

  const onSelectChange = (item) => {
    localStorage.setItem("language", item);

    setValue(item);
    changeLocale(item);
  };

  return (
    <div
      className="lang-select max-w-[134px]"
      onClick={() => setIsClicked(!isClicked)}
    >
      <Select
        onChange={(item) => onSelectChange(item)}
        className="!border-none font-bold text-secondary text-sm sm:text-base"
        variant="static"
        value={value}
      >
        <Option
          value="default"
          className={cls(
            isClicked ? "h-0 pointer-events-none" : "h-0",
            "block  leading-[0.2] "
          )}
        >
          {t("selectLang")}
        </Option>
        <Option value="en">English</Option>
        <Option value="ko">한국어</Option>
      </Select>

      <style jsx="true">
        {`
          .lang-select > div {
            width: 100vw;
            max-width: 154px;
            min-width: auto;
          }
          .lang-select button {
            padding: 0;
          }

          .lang-select label {
            display: none;
          }
          .lang-select ul {
            top: 40px !important;
          }
          .lang-select ul li:first-child {
            padding: 0;
            opacity: 0;
            line-height: 0;
          }
        `}

        {isDark
          ? `.lang-select button svg {
            color: #77b0f4;
          }`
          : `.lang-select button svg {
            color: #17377b;
          }`}
      </style>
    </div>
  );
};

export default LangSelect;
