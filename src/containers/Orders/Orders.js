import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  state = {
    showOrders: false,
  };

  componentDidMount() {
    this.props.onFetchOrder(this.props.token, this.props.userId);
  }

  showOrdersHandler = () => {
    this.setState({ showOrders: (this.showOrders = !this.showOrders) });
  };

  render() {
    let orders = <Spinner />;

    const orderFunction = (order) => {
      return (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
          archiveOrder={() =>
            this.props.onArchiveOrder(order.id, this.props.token)
          }
          archive={order.archive}
        />
      );
    };
    if (!this.props.loading) {
      const ordersArr = this.props.orders;
      orders = (
        <div>
          <input
            type="button"
            value={
              this.state.showOrders ? "Hide Archive Orders" : "Show All Orders"
            }
            onClick={this.showOrdersHandler}
          />
          {!this.state.showOrders
            ? ordersArr.reduce((acc, cur) => {
                if (cur.archive !== undefined && !cur.archive)
                  acc.push(orderFunction(cur));
                return acc;
              }, [])
            : // .filter((order) => order.archive === false)
              // .map((order) => orderFunction(order))
              ordersArr.map((order) => orderFunction(order))}
        </div>
      );
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrder: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
    onArchiveOrder: (orderId, token) =>
      dispatch(actions.archiveOrder(orderId, token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
