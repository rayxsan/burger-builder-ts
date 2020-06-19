import React, { Component } from "react";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";

class ContactData extends Component {
  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your information</h4>
        <input type="text" name="name" placeholder="Your name" />
        <input type="email" name="email" placeholder="Your email" />
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="postal" placeholder="Your zip code" />
        <button>ORDER</button>
      </div>
    );
  }
}

export default ContactData;
