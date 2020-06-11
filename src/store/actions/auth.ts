import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = (): actionTypes.AuthStartAction => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (
  token: string,
  userId: string | null
): actionTypes.AuthSuccessAction => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error: string): actionTypes.AuthFailAction => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = (): actionTypes.AuthLogoutAction => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime: number) => {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email: string, password: string, isSignup: boolean) => {
  return (dispatch: any) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAWDatnBDzc5UZFO_B1apAm7LOeA5n-m6Y";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAWDatnBDzc5UZFO_B1apAm7LOeA5n-m6Y";
    }
    axios
      .post(url, authData)
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate.toLocaleString());
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (
  path: string
): actionTypes.SetAuthRedirectPathAction => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch: any) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const dateString = localStorage.getItem("expirationDate");
      let expirationDate: Date | null = null;
      if (dateString) {
        expirationDate = new Date(dateString);

        if (expirationDate <= new Date()) {
          dispatch(logout());
        } else {
          const userId = localStorage.getItem("userId");
          dispatch(authSuccess(token, userId));
          dispatch(
            checkAuthTimeout(
              (expirationDate.getTime() - new Date().getTime()) / 1000
            )
          );
        }
      }
    }
  };
};
