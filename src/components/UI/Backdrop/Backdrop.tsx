import React, { FunctionComponent } from "react";

import classes from "./Backdrop.module.css";

interface Props {
  clicked: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  show: boolean;
}
const Backdrop: FunctionComponent<Props> = (props) =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked}></div>
  ) : null;

export default Backdrop;
