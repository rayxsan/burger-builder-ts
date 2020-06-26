import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Dispatch, AnyAction } from "redux";
import { AppState } from "../../store";

interface OwnProps {
  loading: boolean;
  orders: any;
}
interface StateProps {
  token: string;
  userId: string;
}
interface DispatchProps {
  onFetchOrder: (token: string, userId: string) => AnyAction;
  onArchiveOrder: (id: string, token: string) => AnyAction;
}
type Props = OwnProps & StateProps & DispatchProps;
interface State {
  showOrders: boolean;
}

class Orders extends Component<Props, State> {
  state = {
    showOrders: false,
  };

  componentDidMount() {
    this.props.onFetchOrder(this.props.token, this.props.userId);
  }

  showOrdersHandler = () => {
    this.setState({ showOrders: !this.state.showOrders });
  };

  render() {
    let orders = <Spinner />;

    const orderFunction = (order: any) => {
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
            ? ordersArr.reduce((acc: any, cur: any) => {
                if (cur.archive !== undefined && !cur.archive)
                  acc.push(orderFunction(cur));
                return acc;
              }, [])
            : // .filter((order) => order.archive === false)
              // .map((order) => orderFunction(order))
              ordersArr.map((order: any) => orderFunction(order))}
        </div>
      );
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    onFetchOrder: (token: string, userId: string) =>
      dispatch<any>(actions.fetchOrders(token, userId)),
    onArchiveOrder: (orderId: string, token: string) =>
      dispatch<any>(actions.archiveOrder(orderId, token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
