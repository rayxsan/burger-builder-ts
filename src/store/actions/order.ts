import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
import { orderData, orders } from "../../shared/types";

export const purchaseBurgerSuccess = (
  id: string,
  orderData: orderData
): actionTypes.PurchaseBurgerSuccessAction => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (
  error: string
): actionTypes.PurchaseBurgerFailAction => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = (): actionTypes.PurchaseBurgerStartAction => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData: orderData, token: string | null) => {
  return (dispatch: any) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((error: string) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const archiveOrderSuccess = (
  orderId: string
): actionTypes.ArchiveOrderSuccessAction => {
  return {
    type: actionTypes.ARCHIVE_ORDER_SUCCESS,
    orderId: orderId,
  };
};

export const archiveOrderFail = (
  error: string
): actionTypes.ArchiveOrderFailAction => {
  return {
    type: actionTypes.ARCHIVE_ORDER_FAIL,
    error: error,
  };
};

export const archiveOrderStart = (): actionTypes.ArchiveOrderStartAction => {
  return {
    type: actionTypes.ARCHIVE_ORDER_START,
  };
};

export const archiveOrder = (orderId: string, token: string | null) => {
  return (dispatch: any) => {
    dispatch(archiveOrderStart());
    const queryParams = "?auth=" + token;
    axios
      .patch(`/orders/${orderId}.json` + queryParams, { archive: true })
      .then((response) => {
        dispatch(archiveOrderSuccess(orderId));
      })
      .catch((error) => {
        dispatch(archiveOrderFail(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersSuccess = (
  orders: any
): actionTypes.FetchOrdersSuccessAction => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (
  error: string
): actionTypes.FetchOrdersFailAction => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = (): actionTypes.FetchOrdersStartAction => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token: string | null, userId: string) => {
  return (dispatch: any) => {
    dispatch(fetchOrdersStart());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/orders.json" + queryParams)
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
