import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

interface Props {
  isAuthenticated: boolean;
}
const NavigationItems = (props: Props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" label="Burder Builder" exact />
    {props.isAuthenticated ? (
      <>
        <NavigationItem link="/orders" label="Orders" />
        <NavigationItem link="/logout" label="Logout" />
      </>
    ) : (
      <NavigationItem link="/auth" label="Login" />
    )}
  </ul>
);

export default NavigationItems;
