import React, { FunctionComponent } from "react";
import classes from "./BurgerIngredient.module.css";

interface Props {
  type: string;
}
const BurgerIngredient: FunctionComponent<Props> = (props) => {
  let ingredient: JSX.Element;

  switch (props.type) {
    case "bread-bottom":
      ingredient = <div className={classes.BreadBottom}></div>;
      break;
    case "bread-top":
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case "meat":
      ingredient = <div className={classes.Meat}></div>;
      break;
    case "cheese":
      ingredient = <div className={classes.Cheese}></div>;
      break;
    case "bacon":
      ingredient = <div className={classes.Bacon}></div>;
      break;
    case "salad":
      ingredient = <div className={classes.Salad}></div>;
      break;
    default:
      ingredient = <></>;
  }

  return ingredient;
};

export default BurgerIngredient;
