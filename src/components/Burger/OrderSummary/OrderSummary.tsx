import React, { FunctionComponent } from "react";

import Button from "../../UI/Button/Button";

interface Props {
  ingredients: { [key: string]: number };
  price: number;
  purchaseCancelled: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  purchaseContinued: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const OrderSummary: FunctionComponent<Props> = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </>
  );
};

export default OrderSummary;
