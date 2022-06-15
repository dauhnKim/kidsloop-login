import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import axios from "axios";

import Wrapper from "../components/Wrapper";

const SignIn = () => {
  const [isPwd, setIsPwd] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  const {
    reset,
    watch,
    register,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const valueOfPwd = watch("password");

  const onValid = async (values) => {
    setIsLoading(true);

    const { email, password } = values;

    try {
      const { data } = await axios.patch(
        "https://my-json-server.typicode.com/kidsloop-test/accounts/sign-in",
        {
          email,
          password,
        }
      );
      console.log(`Welcome, ${data.name}!`);
      reset();
    } catch (error) {
      console.log("error : ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper
      title={"signIn"}
      buttonText={"signIn"}
      onValid={onValid}
      isLoading={isLoading}
    >
      <div className="relative flex flex-col items-start">
        <input
          {...register("email", {
            required: t("errEmailRequired"),
            pattern: {
              value: /\S+@\S+\.\S+/,
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
    </Wrapper>
  );
};

export default SignIn;
