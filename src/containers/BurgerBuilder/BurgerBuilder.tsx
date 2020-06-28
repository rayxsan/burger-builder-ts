import React, { Component } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import { Dispatch, AnyAction } from "redux";
import { AppState } from "../../store";
import { RouteComponentProps } from "react-router-dom";

import * as actions from "../../store/actions/index";

interface OwnProps extends RouteComponentProps {}
interface StateProps {
  ings: {
    [key: string]: number;
  };
  price: number;
  error: boolean;
  isAuthenticated: boolean;
}
interface DispatchProps {
  onIngredientAdded: (ingredientName: string) => AnyAction;
  onIngredientRemoved: (ingredientName: string) => AnyAction;
  onInitIngredients: () => AnyAction;
  onSetAuthRedirectPath: (path: string) => AnyAction;
  onInitPurchase: () => AnyAction;
}

type Props = OwnProps & StateProps & DispatchProps;

interface State {
  purchasing: boolean;
}

export class BurgerBuilder extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { purchasing: false };
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients: { [key: string]: number }) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const { ings } = this.props;
    // from the obj containing the ingredient names and their quantity
    // build another obj that indicates if an ingredient is not in the order
    // example: {meet: 1, salad: 0} -> {meet: false, salad: true}
    const disabledIngredients = Object.keys(ings).reduce((acc, key) => {
      return { ...acc, [key]: ings[key] <= 0 ? true : false };
    }, {});

    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledIngredients}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
            price={this.props.price}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    // {salad: true, meat: false, ...}
    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    onIngredientAdded: (ingredientName: string) =>
      dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName: string) =>
      dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch<any>(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path: string) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
