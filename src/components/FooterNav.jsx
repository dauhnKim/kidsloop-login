import React from "react";
import { useTranslation } from "react-i18next";

const FooterNav = () => {
  const { t } = useTranslation();

  const menus = [t("help"), t("privacy"), t("terms")];
  return (
    <nav>
      <ul className="flex space-x-3 text-sm sm:text-base">
        {menus.map((menu) => (
          <li
            key={menu}
            className="text-secondary font-bold hover:underline cursor-pointer whitespace-nowrap"
          >
            {menu}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FooterNav;
