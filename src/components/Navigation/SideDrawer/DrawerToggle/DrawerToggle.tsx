import React, { FunctionComponent } from "react";

import classes from "./DrawerToggle.module.css";

interface Props {
  clicked: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
}

const drawerToggle: FunctionComponent<Props> = (props) => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggle;
