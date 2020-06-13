import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import { Order } from "../../shared/types";

export interface OrderState {
  orders: Array<Order>;
  loading: boolean;
  purchased: boolean;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (
  state: OrderState,
  action: actionTypes.PurchaseBurgerAction
) => {
  return updateObject(state, { purchased: false });
};

const purchaseBurgerStart = (
  state: OrderState,
  action: actionTypes.PurchaseBurgerAction
) => {
  return updateObject(state, { loading: true });
};

const purchaseBurgerSuccess = (
  state: OrderState,
  action: actionTypes.PurchaseBurgerSuccessAction
) => {
  const newOrder: any = updateObject(action.orderData, {
    id: action.orderId,
  });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  });
};

const purchaseBurgerFail = (
  state: OrderState,
  action: actionTypes.PurchaseBurgerAction
) => {
  return updateObject(state, { loading: false });
};

const fetchOrdersStart = (
  state: OrderState,
  action: actionTypes.PurchaseBurgerAction
) => {
  return updateObject(state, { loading: true });
};

const fetchOrdersSuccess = (
  state: OrderState,
  action: actionTypes.FetchOrdersSuccessAction
) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false,
  });
};

const fetchOrdersFail = (
  state: OrderState,
  action: actionTypes.PurchaseBurgerAction
) => {
  return updateObject(state, { loading: false });
};

const archiveOrderFail = (
  state: OrderState,
  action: actionTypes.PurchaseBurgerAction
) => {
  return updateObject(state, { loading: false });
};

const archiveOrderStart = (
  state: OrderState,
  action: actionTypes.PurchaseBurgerAction
) => {
  return updateObject(state, { loading: true });
};

const archiveOrderSuccess = (
  state: OrderState,
  action: actionTypes.ArchiveOrderSuccessAction
) => {
  return updateObject(state, {
    orders: state.orders.map((order) => {
      if (order.id === action.orderId) {
        order.archive = true;
      }
      return order;
    }),
    loading: false,
  });
};

const reducer = (
  state = initialState,
  action: actionTypes.PurchaseBurgerAction
) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);
    case actionTypes.ARCHIVE_ORDER_FAIL:
      return archiveOrderFail(state, action);
    case actionTypes.ARCHIVE_ORDER_START:
      return archiveOrderStart(state, action);
    case actionTypes.ARCHIVE_ORDER_SUCCESS:
      return archiveOrderSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
