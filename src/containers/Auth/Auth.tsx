import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { updateObject, checkValidity } from "../../shared/utility";
import { Dispatch, AnyAction } from "redux";
import { AppState } from "../../store";
import { Formik, Form, Field, FormikErrors, ErrorMessage } from "formik";

interface OwnProps {
  buildingBurger: React.ReactNode;
  authRedirectPath: string;
  loading: boolean;
  error: any;
  isAuthenticated: boolean;
}
interface StateProps {}
interface DispatchProps {
  onAuth: (email: string, password: string, isSignup: boolean) => AnyAction;
  onSetAuthRedirectPath: () => AnyAction;
}
type Props = OwnProps & StateProps & DispatchProps;
interface State {
  isSignup: boolean;
}

interface FormValues {
  email: string;
  password: string;
  verifyPassword: string;
}

class Auth extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isSignup: false };
  }

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  validateForm = (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};
    if (!checkValidity(values.email, { isEmail: true })) {
      errors["email"] = "Invalid email address";
    }

    if (!checkValidity(values.password, { minLength: 5 })) {
      errors["password"] = "Password is not long enough";
    }

    if (this.state.isSignup && values.password !== values.verifyPassword) {
      errors["verifyPassword"] = "Passwords do not match";
    }

    return errors;
  };

  submitForm = (values: FormValues) => {
    const { isSignup } = this.state;
    this.props.onAuth(values.email, values.password, isSignup);
  };

  render() {
    const { isSignup } = this.state;
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }
    const inputClasses = [classes.InputElement];
    return (
      <div className={classes.Auth}>
        {authRedirect}
        <Formik
          initialValues={{ email: "", password: "", verifyPassword: "" }}
          validate={this.validateForm}
          onSubmit={this.submitForm}
          validateOnChange={true}
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form>
              <Field
                className={inputClasses.join(" ")}
                type="email"
                name="email"
                placeholder="Email Address"
              />
              <ErrorMessage
                className={classes.ValidationError}
                name="email"
                component="div"
              />
              <Field
                className={[classes.InputElement].join(" ")}
                type="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage
                className={classes.ValidationError}
                name="password"
                component="div"
              />
              {isSignup && (
                <>
                  <Field
                    className={[classes.InputElement].join(" ")}
                    type="password"
                    name="verifyPassword"
                    placeholder="Verify Password"
                  />
                  <ErrorMessage
                    className={classes.ValidationError}
                    name="verifyPassword"
                    component="div"
                  />
                </>
              )}

              <Button
                btnType="Success"
                type="submit"
                disabled={isSubmitting || !dirty || !isValid}
              >
                SUBMIT
              </Button>
            </Form>
          )}
        </Formik>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          SWITCH TO {isSignup ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    onAuth: (email: string, password: string, isSignup: boolean) =>
      dispatch<any>(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
