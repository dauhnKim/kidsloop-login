import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import axios from "axios";

import Wrapper from "../components/Wrapper";
import InputPassword from "../components/InputPassword";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicText, setDynamicText] = useState({
    title: "forgotPassword0",
    desc: "forgotPasswordDesc0",
    buttonText: "forgotPasswordBtn0",
  });

  const {
    reset,
    watch,
    register,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const valueOfPwd = watch("password");

  const onValid = async (values) => {
    if (step === 0) {
      setStep(1);
      setDynamicText((prev) => ({
        buttonText: prev.buttonText,
        desc: "forgotPasswordDesc1",
        title: "forgotPassword1",
      }));
      return;
    }

    if (step === 1) {
      setStep(2);
      setDynamicText((prev) => ({
        buttonText: "forgotPasswordBtn1",
        desc: "forgotPasswordDesc2",
        title: "forgotPassword2",
      }));
      return;
    }

    if (step === 2) {
      setIsLoading(true);

      try {
        const res = await axios.patch(
          "https://my-json-server.typicode.com/kidsloop-test/accounts/reset-password"
        );
        console.log(`Action Completed:`, res.data.actionCompleted);
        reset();
        navigate("/");
      } catch (error) {
        console.log("error : ", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Wrapper
      onValid={onValid}
      title={dynamicText.title}
      buttonText={dynamicText.buttonText}
      isPwd={true}
      isLoading={isLoading}
    >
      {step === 0 && (
        <div className="relative flex flex-col items-start">
          <p className="text-sm mb-8">{t(dynamicText.desc)}</p>
          <input
            {...register("email", {
              required: t("errEmailRequired"),
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: t("errEmailPattern"),
              },
            })}
            className="bg-transparent appearance-none w-full px-3 py-2 border input-border rounded-xl input-focus label-text"
            placeholder="Enter the email address"
            name="email"
            label="email"
            type="email"
            required
          />
          <span className="ml-1 mt-1 text-xs error-text">
            {errors.email?.message}
          </span>
        </div>
      )}

      {step === 1 && (
        <div className="relative flex flex-col items-start">
          <p className="text-sm mb-8">{t(dynamicText.desc)}</p>
          <input
            {...register("otp", {
              required: t("errEmailRequired"),
              minLength: {
                message: t("errOtpLeng"),
                value: 4,
              },
            })}
            className="bg-transparent appearance-none w-full px-3 py-2 border input-border rounded-xl input-focus label-text"
            placeholder="Enter the OTP"
            name="otp"
            label="otp"
            required
            maxLength={4}
          />
          <span className="ml-1 mt-1 text-xs error-text">
            {errors.otp?.message}
          </span>
        </div>
      )}

      {step === 2 && (
        <div className="relative flex flex-col items-start">
          <p className="text-sm mb-8">{t(dynamicText.desc)}</p>

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
      )}
    </Wrapper>
  );
};

export default ForgotPassword;
