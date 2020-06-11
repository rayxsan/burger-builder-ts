import reducer from "../store/reducers/auth";
import * as actionTypes from "../store/actions/actionTypes";

describe("auth reducer", () => {
  const initState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: "/",
  };

  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it("should store the token upon login", () => {
    expect(
      reducer(initState, {
        type: actionTypes.AUTH_SUCCESS,
        idToken: "some-token",
        userId: "some-userId",
      })
    ).toEqual({
      token: "some-token",
      userId: "some-userId",
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
});
