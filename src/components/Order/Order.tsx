import React, { FunctionComponent } from "react";

import classes from "./Order.module.css";

interface Props {
  ingredients: {
    [key: string]: number;
  };
  archive: boolean;
  price: string;
  archiveOrder: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}

const order: FunctionComponent<Props> = (props) => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  const ingredientOutput = ingredients.map((ig) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>

      {props.archive !== undefined && !props.archive && (
        <input
          type="button"
          value="Archive Order"
          onClick={props.archiveOrder}
          // disabled={props.archive && props.archive === undefined}
        />
      )}
    </div>
  );
};

export default order;
