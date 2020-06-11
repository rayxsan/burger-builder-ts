import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

export interface AuthState {
  token: string | null;
  userId: string | null;
  error: string | null;
  loading: boolean;
  authRedirectPath: string;
}

const initialState: AuthState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};

const authStart = (state: AuthState, action: any) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state: AuthState, action: any) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
  });
};

const authFail = (state: AuthState, action: any) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state: AuthState, action: any) => {
  return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state: AuthState, action: any) => {
  return updateObject(state, { authRedirectPath: action.path });
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;