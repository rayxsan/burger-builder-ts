import React from "react";

import classes from "./BuildControl.module.css";

interface buildControlProps {
  label: string;
  removed: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled: boolean;
  added: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const buildControl = (props: buildControlProps) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.removed}
      disabled={props.disabled}
    >
      Less
    </button>
    <button className={classes.More} onClick={props.added}>
      More
    </button>
  </div>
);

export default buildControl;
