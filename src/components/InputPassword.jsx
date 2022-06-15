import React, { forwardRef, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const InputPassword = forwardRef(({ valueOfPwd, ...rest }, ref) => {
  const [isPwd, setIsPwd] = useState(true);

  return (
    <div className="relative w-full flex items-center">
      <input
        className="bg-transparent appearance-none w-full px-3 py-2 border input-border rounded-xl input-focus label-text"
        placeholder="Password"
        name="password"
        label="password"
        type={isPwd ? "password" : "text"}
        required
        ref={ref}
        {...rest}
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
  );
});

export default InputPassword;
