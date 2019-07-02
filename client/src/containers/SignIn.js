import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as R from "ramda";
import { connect } from "react-redux";
import validator from "validator";
import logo from "../images/logoalt.svg";
import { logIn } from "../actions/authActions";

const SignIn = props => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    error: false
  });

  const handleChange = e =>
    setFormData(R.merge(formData, { [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();

    /*
    setFormData({
      error: "out of here"
    });
    return;
    */

    const { email, password } = formData;

    if (validator.isEmpty(email) || validator.isEmpty(password)) {
      setFormData(R.merge(formData, { error: "All fields must be completed" }));
      return false;
    }

    if (!validator.isEmail(email)) {
      setFormData(R.merge(formData, { error: "Invalid email address" }));
      return false;
    }

    setFormData(R.merge(formData, { error: false }));

    props.logIn(email, password);
  };

  return (
    <div className="formbox">
      <img src={logo} className="main-logo" alt="logo" />
      <h1>Sign in to your account</h1>
      <p>Enter your email and password</p>
      <form name="signup" onSubmit={handleSubmit}>
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
        {formData.error && <label className="error">{formData.error}</label>}
      </form>
      <Link to="/signup">Or SignUp for an account</Link>
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

export { SignIn };
