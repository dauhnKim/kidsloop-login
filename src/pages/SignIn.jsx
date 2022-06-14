import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import axios from "axios";
import { cls } from "../utils/libs";

import FooterNav from "../components/FooterNav";
import LangSelect from "../components/LangSelect";
import DarkModeToggle from "../components/DarkModeToggle";
import Button from "../components/Button";

export default function SignIn() {
  const [isPwd, setIsPwd] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  const {
    reset,
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });

  const valueOfPwd = watch("password");
  const valueOfPwd2 = watch("password2");

  const onValid = async (values) => {
    setIsLoading(true);
    console.log("values", values);
    const { email, password } = values;
    try {
      // const { data } = await axios.post(
      //   "https://my-json-server.typicode.com/kidsloop-test/accounts/sign-in",
      //   {
      //     email,
      //     password,
      //   }
      // );
      // reset();
    } catch (error) {
      console.log("error : ", error);
    }
    setIsLoading(false);
  };

  console.log("errors", errors);
  return (
    <div className="flex flex-col space-y-3">
      <form
        className="flex flex-col w-auto p-6 rounded-lg card-bg card-shadow min-w-[368px]"
        onSubmit={handleSubmit(onValid)}
      >
        <fieldset className="flex flex-col space-y-3">
          <legend className="text-4xl leading-[1.3] font-semibold">
            <img
              src="/kidsloop_min_logo.png"
              alt="kidsloop logo"
              className="w-20 h-auto mb-3"
            />
            {t("signIn")}
          </legend>
          <div className="relative flex flex-col items-start">
            <input
              {...register("email", {
                required: t("errEmailRequired"),
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: t("errEmailPattern"),
                },
              })}
              className="bg-transparent appearance-none w-full px-3 py-2 border input-border rounded-xl input-focus label-text"
              placeholder="Email or Phone"
              name="email"
              label="email"
              type="email"
              required
            />
            <span className="ml-1 mt-1 text-xs error-text">
              {errors.email?.message}
            </span>
          </div>
          <div className="relative flex flex-col items-start">
            <div className="relative w-full flex items-center">
              <input
                {...register("password", {
                  required: t("errPasswordRequired"),
                  minLength: {
                    message: t("errPasswordMinLeng"),
                    value: 8,
                  },
                  maxLength: {
                    message: t("errPasswordMaxLeng"),
                    value: 15,
                  },
                })}
                className="bg-transparent appearance-none w-full px-3 py-2 border input-border rounded-xl input-focus label-text"
                placeholder="Password"
                name="password"
                label="password"
                type={isPwd ? "password" : "text"}
                required
              />
              {valueOfPwd?.length > 0 &&
                (isPwd ? (
                  <BsEye
                    className="w-5 h-5 absolute right-5 cursor-pointer label-text"
                    onClick={() => setIsPwd(!isPwd)}
                  />
                ) : (
                  <BsEyeSlash
                    className="w-5 h-5 absolute right-5 cursor-pointer label-text"
                    onClick={() => setIsPwd(!isPwd)}
                  />
                ))}
            </div>

            <span className="ml-1 mt-1 text-xs error-text">
              {errors.password?.message}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <Link
              to="/forgot-password"
              className="font-semibold text-secondary hover:underline"
            >
              {t("password")}
            </Link>

            <Button
              disabled={isSubmitting}
              isLoading={isLoading}
              text={t("signIn")}
            />
          </div>
          <Link
            to="/sign-up"
            className="font-semibold text-secondary hover:underline"
          >
            {t("creatAccount")}
          </Link>
        </fieldset>
      </form>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <DarkModeToggle isTop={false} size={20} />
          <LangSelect />
        </div>

        <FooterNav />
      </div>
    </div>
  );
}
