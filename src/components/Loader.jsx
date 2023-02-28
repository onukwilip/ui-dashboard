import React from "react";
import { Bars } from "react-loader-spinner";
import css from "../styles/loader/Loader.module.scss";

const Loader = () => {
  const loaderProps = {
    visible: true,
    width: "50",
    height: "50",
    duration: 1,
    color: "#4f3f75",
    // colors: ["#6666a3", "#4f3f75", "#c8c8dc"],
  };
  return (
    <div className={css.loader}>
      <Bars {...loaderProps} />
    </div>
  );
};

export default Loader;
