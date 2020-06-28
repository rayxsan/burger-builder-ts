import React, { FunctionComponent } from "react";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import { addIngredient } from "../../../store/actions";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

//TODO: Fix less button (disable when there is no ingredients) and types in ingredientAdded & ingredientRemoved
interface Props {
  price: number;
  ingredientAdded: any;
  ingredientRemoved: any;
  disabled: any;
  purchasable: boolean;
  ordered: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isAuth: boolean;
}

const buildControls: FunctionComponent<Props> = (props) => {
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

export default buildControls;
