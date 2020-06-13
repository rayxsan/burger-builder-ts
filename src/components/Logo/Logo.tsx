import React from "react";

import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";

interface height {
  height: number;
}
const logo = (props: height) => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default logo;
