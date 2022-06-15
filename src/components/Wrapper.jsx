import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { cls } from "../utils/libs";

import Button from "../components/Button";
import FooterNav from "../components/FooterNav";
import LangSelect from "../components/LangSelect";
import DarkModeToggle from "../components/DarkModeToggle";

const Wrapper = ({
  title,
  buttonText,
  onValid,
  isLoading,
  isPwd = false,
  isSignUp = false,
  children,
}) => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ mode: "onBlur" });

  return (
    <div className="flex flex-col space-y-3">
      <form
        className="flex flex-col p-6 rounded-lg card-bg card-shadow w-[320px] sm:w-[368px]"
        onSubmit={handleSubmit(onValid)}
      >
        <fieldset className="flex flex-col space-y-3">
          <legend className="text-[28px] sm:text-4xl leading-[1.3] font-semibold">
            <img
              src="/kidsloop_min_logo.png"
              alt="kidsloop logo"
              className="w-20 h-auto mb-3"
            />
            {t(title)}
          </legend>

          {children}

          <div
            className={cls(
              "flex items-center justify-between text-sm sm:text-base"
            )}
          >
            {!isPwd ? (
              <Link
                to="/forgot-password"
                className="font-semibold text-secondary hover:underline"
              >
                {t("password")}
              </Link>
            ) : (
              <Link
                to="/sign-up"
                className="font-semibold text-secondary hover:underline"
              >
                {t("creatAccount")}
              </Link>
            )}

            <Button
              disabled={isSubmitting}
              isLoading={isLoading}
              text={t(buttonText)}
            />
          </div>
          {!isPwd && !isSignUp && (
            <Link
              to="/sign-up"
              className="font-semibold text-secondary hover:underline text-sm sm:text-base"
            >
              {t("creatAccount")}
            </Link>
          )}
        </fieldset>
      </form>
      <div className="flex justify-between items-center w-auto max-w-[320px] sm:max-w-[368px]">
        <div className="flex items-center space-x-2">
          <DarkModeToggle isTop={false} size={20} />
          <LangSelect />
        </div>

        <FooterNav />
      </div>
    </div>
  );
};

export default Wrapper;
