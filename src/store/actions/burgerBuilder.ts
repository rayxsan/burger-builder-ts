import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
import { Dispatch } from "redux";

export const addIngredient = (
  name: string
): actionTypes.AddIngredientAction => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (
  name: string
): actionTypes.RemoveIngredientAction => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredients = (ingredients: {
  [key: string]: number;
}): actionTypes.SetIngredientsAction => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed = (): actionTypes.FetchIngredientsFailedAction => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return (dispatch: Dispatch) => {
    axios
      .get("https://react-my-burger-000.firebaseio.com/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
