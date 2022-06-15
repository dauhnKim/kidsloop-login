import React from "react";
import Loader from "./Loader";

const Button = ({ disabled, isLoading, text }) => {
  return (
    <button
      type="submit"
      className="bg-primary text-white px-4 sm:px-6 py-2 rounded-full hover:bg-primary/90 duration-150 min-h-[40px] min-w-[99px]"
      disabled={disabled}
    >
      {isLoading ? <Loader /> : text}
    </button>
  );
};

export default Button;
