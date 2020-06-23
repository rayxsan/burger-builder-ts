// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { AppState } from "../../../index";
// import { AnyAction, Dispatch } from "redux";

// import Button from "../../../components/UI/Button/Button";
// import Spinner from "../../../components/UI/Spinner/Spinner";
// import classes from "./ContactData.css";
// import axios from "../../../axios-orders";
// import Input from "../../../components/UI/Input/Input";
// import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
// import * as actions from "../../../store/actions/index";
// import { updateObject, checkValidity } from "../../../shared/utility";
// import { VERSION } from "../../../version";

interface OrderForm {
  name: {
    elementType: string;
    elementConfig: {
      type: string;
      placeholder: string;
    };
    value: string;
    validation: {
      required: boolean;
    };
    valid: boolean;
    touched: boolean;
  };
  street: {
    elementType: string;
    elementConfig: {
      type: string;
      placeholder: string;
    };
    value: string;
    validation: {
      required: boolean;
    };
    valid: boolean;
    touched: boolean;
  };
  zipCode: {
    elementType: string;
    elementConfig: {
      type: string;
      placeholder: string;
    };
    value: string;
    validation: {
      required: boolean;
      minLength: number;
      maxLength: number;
    };
    valid: false;
    touched: false;
  };
  country: {
    elementType: string;
    elementConfig: {
      type: string;
      placeholder: string;
    };
    value: string;
    validation: {
      required: boolean;
    };
    valid: boolean;
    touched: boolean;
  };
  email: {
    elementType: string;
    elementConfig: {
      type: string;
      placeholder: string;
    };
    value: string;
    validation: {
      required: boolean;
    };
    valid: boolean;
    touched: boolean;
  };
  deliveryMethod: {
    elementType: string;
    elementConfig: {
      options: [
        { value: "fastest"; displayValue: "Fastest" },
        { value: "cheapest"; displayValue: "Cheapest" }
      ];
    };
    value: string;
    validation: {};
    valid: boolean;
  };
}

interface State {
  orderForm: OrderForm;
  formIsValid: boolean;
  archive: boolean;
}

interface OwnProps {}

interface StateProps {
  ings: { [key: string]: number };
  price: number;
  loading: boolean;
  token: string | null;
  userId: string | null;
}
interface DispatchProps {
  onOrderBurger: (orderData: any, token: string) => AnyAction;
}

type Props = OwnProps & StateProps & DispatchProps;

class ContactData extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      orderForm: {
        name: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Your Name",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        street: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Street",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        zipCode: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "ZIP Code",
          },
          value: "",
          validation: {
            required: true,
            minLength: 5,
            maxLength: 5,
          },
          valid: false,
          touched: false,
        },
        country: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Country",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        email: {
          elementType: "input",
          elementConfig: {
            type: "email",
            placeholder: "Your E-Mail",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        deliveryMethod: {
          elementType: "select",
          elementConfig: {
            options: [
              { value: "fastest", displayValue: "Fastest" },
              { value: "cheapest", displayValue: "Cheapest" },
            ],
          },
          value: "fastest",
          validation: {},
          valid: true,
        },
      },
      formIsValid: false,
      archive: false, //set archive property only when form is submitted
    };
  }

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
      version: VERSION,
      archive: this.state.archive,
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(
      this.state.orderForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.orderForm[inputIdentifier].validation
        ),
        touched: true,
      }
    );

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            valueType={formElement.config.elementConfig.placeholder}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
