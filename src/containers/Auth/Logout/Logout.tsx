import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { Dispatch, AnyAction } from "redux";

interface DispatchProps {
  onLogout: () => AnyAction;
}

type Props = DispatchProps;

interface State {}

class Logout extends Component<Props, State> {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onLogout: () => dispatch<AnyAction>(actions.logout()),
  };
};
export default connect(null, mapDispatchToProps)(Logout);
