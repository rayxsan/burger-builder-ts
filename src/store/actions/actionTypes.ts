import { orderData, orders } from "../../shared/types";

// Burger Builder action types
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const SET_INGREDIENTS = "SET_INGREDIENTS";
export const FETCH_INGREDIENTS_FAILED = "FETCH_INGREDIENTS_FAILED";

export interface AddIngredientAction {
  type: typeof ADD_INGREDIENT;
  ingredientName: string;
}

export interface RemoveIngredientAction {
  type: typeof REMOVE_INGREDIENT;
  ingredientName: string;
}

export interface SetIngredientsAction {
  type: typeof SET_INGREDIENTS;
  ingredients: { [key: string]: number };
}

export interface FetchIngredientsFailedAction {
  type: typeof FETCH_INGREDIENTS_FAILED;
}

export type IngredientAction =
  | AddIngredientAction
  | RemoveIngredientAction
  | SetIngredientsAction
  | FetchIngredientsFailedAction;

// *******************************

export const PURCHASE_BURGER_SUCCESS = "PURCHASE_BURGER_SUCCESS";
export const PURCHASE_BURGER_FAIL = "PURCHASE_BURGER_FAIL";
export const PURCHASE_BURGER_START = "PURCHASE_BURGER_START";

export interface PurchaseBurgerSuccessAction {
  type: typeof PURCHASE_BURGER_SUCCESS;
  orderId: string;
  orderData: orderData;
}

export interface PurchaseBurgerFailAction {
  type: typeof PURCHASE_BURGER_FAIL;
  error: string;
}
export interface PurchaseBurgerStartAction {
  type: typeof PURCHASE_BURGER_START;
}

export const PURCHASE_INIT = "PURCHASE_INIT";
export const FETCH_ORDERS_START = "FETCH_ORDERS_START";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAIL = "FETCH_ORDERS_FAIL";

export const ARCHIVE_ORDER_START = "ARCHIVE_ORDER_START";
export const ARCHIVE_ORDER_SUCCESS = "ARCHIVE_ORDER_SUCCESS";
export const ARCHIVE_ORDER_FAIL = "ARCHIVE_ORDER_FAIL";

export interface PurchaseInitAction {
  type: typeof PURCHASE_INIT;
}

export interface FetchOrdersStartAction {
  type: typeof FETCH_ORDERS_START;
}

export interface FetchOrdersSuccessAction {
  type: typeof FETCH_ORDERS_SUCCESS;
  orders: orders;
}

export interface FetchOrdersFailAction {
  type: typeof FETCH_ORDERS_FAIL;
  error: string;
}

export interface ArchiveOrderStartAction {
  type: typeof ARCHIVE_ORDER_START;
}

export interface ArchiveOrderSuccessAction {
  type: typeof ARCHIVE_ORDER_SUCCESS;
  orderId: string;
}

export interface ArchiveOrderFailAction {
  type: typeof ARCHIVE_ORDER_FAIL;
  error: string;
}

export type PurchaseBurgerAction =
  | PurchaseBurgerSuccessAction
  | PurchaseBurgerFailAction
  | PurchaseBurgerStartAction
  | PurchaseInitAction
  | FetchOrdersStartAction
  | FetchOrdersSuccessAction
  | FetchOrdersFailAction
  | ArchiveOrderStartAction
  | ArchiveOrderSuccessAction
  | ArchiveOrderFailAction;

// *******************************

// Auth action types
export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const SET_AUTH_REDIRECT_PATH = "SET_AUTH_REDIRECT_PATH";

export interface AuthStartAction {
  type: typeof AUTH_START;
}

export interface AuthSuccessAction {
  type: typeof AUTH_SUCCESS;
  idToken: string | null;
  userId: string | null;
}

export interface AuthFailAction {
  type: typeof AUTH_FAIL;
  error: string | null;
}

export interface AuthLogoutAction {
  type: typeof AUTH_LOGOUT;
}

export interface SetAuthRedirectPathAction {
  type: typeof SET_AUTH_REDIRECT_PATH;
  path: string;
}

export type AuthAction =
  | AuthStartAction
  | AuthSuccessAction
  | AuthFailAction
  | AuthLogoutAction
  | SetAuthRedirectPathAction;
