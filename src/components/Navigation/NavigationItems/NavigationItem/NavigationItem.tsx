import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItem.module.css";

interface Props {
  link: string;
  exact?: boolean;
  children?: any;
  label: string;
}

const NavigationItem = (props: Props) => (
  <li className={classes.NavigationItem}>
    <NavLink
      to={props.link}
      exact={props.exact}
      activeClassName={classes.active}
    >
      {props.label}
    </NavLink>
  </li>
);

export default NavigationItem;
