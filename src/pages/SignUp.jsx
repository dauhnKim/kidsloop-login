import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import axios from "axios";
import Wrapper from "../components/Wrapper";
import InputPassword from "../components/InputPassword";

const SignUp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const {
    reset,
    watch,
    register,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const valueOfPwd = watch("password");

  const onValid = async (values) => {
    setIsLoading(true);

    try {
      const res = await axios.patch(
        "https://my-json-server.typicode.com/kidsloop-test/accounts/sign-up"
      );
      console.log(`ID:`, res.data.id);
      reset();
      navigate("/");
    } catch (error) {
      console.log("error : ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper
      onValid={onValid}
      title={"signUp"}
      buttonText={"signUp"}
      isLoading={isLoading}
      isSignUp={true}
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
        <InputPassword
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
          valueOfPwd={valueOfPwd}
        />
        <span className="ml-1 mt-1 text-xs error-text">
          {errors.password?.message}
        </span>
      </div>
    </Wrapper>
  );
};

export default SignUp;
