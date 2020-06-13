import React, { Component } from "react";

import classes from "./Modal.module.css";
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../Backdrop/Backdrop";

interface Props {
  show: boolean;
  modalClosed: () => void;
  children?: React.ReactNode;
}

interface State {}

class Modal extends Component<Props, State> {
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    const { show, modalClosed, children } = this.props;
    return (
      <Aux>
        <Backdrop show={show} clicked={modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: show ? "translateY(0)" : "translateY(-100vh)",
            opacity: show ? "1" : "0",
          }}
        >
          {children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
