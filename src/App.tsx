import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import { AppState } from "./index";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});

const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

interface OwnProps {}
interface StateProps {
  isAuthenticated: boolean;
}
interface DispatchProps {
  onTryAutoSignup: () => AnyAction;
}

type Props = OwnProps & StateProps & DispatchProps;

interface State {}

class App extends Component<Props, State> {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
  ownProps: OwnProps
): DispatchProps => {
  return {
    onTryAutoSignup: () => dispatch<any>(actions.authCheckState()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(connector(App));
