import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import burgerBuilderReducer, {
  BurgerBuilderState,
} from "./reducers/burgerBuilder";
import orderReducer, { OrderState } from "./reducers/order";
import authReducer, { AuthState } from "./reducers/auth";

const rootReducer = combineReducers<AppState>({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer,
});

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export interface AppState {
  auth: AuthState;
  order: OrderState;
  burgerBuilder: BurgerBuilderState;
}
