import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { AppState } from "../../../store/index";
import { AnyAction, Dispatch } from "redux";
import * as actions from "../../../store/actions/index";
import { checkValidity } from "../../../shared/utility";
import { Formik, Form, Field, FormikErrors, ErrorMessage } from "formik";
import { VERSION } from "../../../version";

interface OwnProps {
  ings: { [key: string]: number };
  price: number;
  loading: boolean;
  token: string;
  userId: string;
}
interface StateProps {
  formIsValid: boolean;
}
interface DispatchProps {
  onOrderBurger: (orderData: any, token: string) => AnyAction;
}
type Props = OwnProps & StateProps & DispatchProps;

interface FormValues {
  name: string;
  street: string;
  zipCode: string;
  country: string;
  email: string;
  deliveryMethod: "fastest" | "cheapest";
}

interface orderData {
  ingredients: {
    [key: string]: number;
  };
  price: number;
  orderData: FormValues;
  userId: string;
  archive: boolean;
  version: number;
}
class ContactData extends Component<Props> {
  validateForm = (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};

    if (!checkValidity(values.name, { required: true })) {
      errors["name"] = "Please enter your name";
    }
    if (!checkValidity(values.street, { required: true })) {
      errors["street"] = "Please enter your address";
    }
    if (
      !checkValidity(values.zipCode, {
        isNumeric: true,
        minLength: 5,
        maxLength: 5,
      })
    ) {
      errors["zipCode"] = "Please enter a valid Zip Code";
    }
    if (!checkValidity(values.country, { required: true })) {
      errors["country"] = "Please enter your country";
    }
    if (!checkValidity(values.email, { isEmail: true })) {
      errors["email"] = "Invalid email address";
    }
    return errors;
  };

  submitForm = (values: FormValues) => {
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: values,
      userId: this.props.userId,
      archive: false,
      version: VERSION,
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <Formik
          initialValues={{
            name: "",
            street: "",
            zipCode: "",
            country: "",
            email: "",
            deliveryMethod: "fastest",
          }}
          validate={this.validateForm}
          onSubmit={this.submitForm}
          validateOnChange={true}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="name" placeholder="Your Name" />
              <ErrorMessage name="name" component="div" />
              <Field name="street" placeholder="Your Address" />
              <ErrorMessage name="street" component="div" />
              <Field name="zipCode" placeholder="Your Zip Code" />
              <ErrorMessage name="zipCode" component="div" />
              <Field name="country" placeholder="Your Country" />
              <ErrorMessage name="country" component="div" />
              <Field type="email" name="email" placeholder="Your Email" />
              <ErrorMessage name="email" component="div" />
              <Field name="deliveryMethod" component="select">
                <option value="fastest">Fastest</option>
                <option value="cheapest">Cheapest</option>
              </Field>

              <Button btnType="Success" type="submit" disabled={isSubmitting}>
                ORDER
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    onOrderBurger: (orderData: orderData, token: string) =>
      dispatch<any>(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
