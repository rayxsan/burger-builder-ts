import React, { FunctionComponent } from "react";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import { AnyAction } from "redux";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

interface Props {
  price: number;
  ingredientAdded: (type: string) => AnyAction;
  ingredientRemoved: (type: string) => AnyAction;
  disabled: { [ingredientName: string]: boolean };
  purchasable: boolean;
  ordered: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isAuth: boolean;
}

const BuildControls: FunctionComponent<Props> = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        {props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
      </button>
    </div>
  );
};

export default BuildControls;
