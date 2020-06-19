import React, { FunctionComponent } from "react";
import classes from "./Button.module.css";

interface Props {
  disabled?: boolean;
  btnType: string;
  clicked: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const button: FunctionComponent<Props> = (props) => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;