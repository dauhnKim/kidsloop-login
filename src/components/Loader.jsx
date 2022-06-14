import React from "react";
import ReactLoading from "react-loading";
import { cls } from "../utils/libs";

const Loader = ({ className }) => {
  return (
    <div className={cls(className, "w-5 h-5 flex justify-center mx-auto")}>
      <ReactLoading type="spin" color={"#d2d6da"} />
    </div>
  );
};

export default Loader;
