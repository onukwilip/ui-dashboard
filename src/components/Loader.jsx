import React from "react";
import { BouncyBallsLoader } from "react-loaders-kit";
import css from "../styles/loader/Loader.module.scss";

const Loader = () => {
  const loaderProps = {
    loading: true,
    size: 50,
    duration: 1,
    colors: ["#6666a3", "#4f3f75", "#c8c8dc"],
  };
  return (
    <div className={css.loader}>
      <BouncyBallsLoader {...loaderProps} />
    </div>
  );
};

export default Loader;
