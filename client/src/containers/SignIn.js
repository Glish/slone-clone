import React, { useState } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import logo from "../images/logoalt.svg";
import { logIn } from "../actions/authActions";

const SignIn = props => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = e =>
    setFormData(R.merge(formData, { [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();

    props.logIn(formData.email, formData.password);
  };

  return (
    <div className="formbox">
      <img src={logo} className="main-logo" alt="logo" />
      <h1>Sign in to your account</h1>
      <p>Enter your email and password</p>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="text"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
        />
        <input type="submit" value="Continue" />
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  logIn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
