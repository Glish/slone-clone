import React, { useState } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import validator from "validator";
import logo from "../images/logoalt.svg";
import { signUp } from "../actions/authActions";

const SignUp = props => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repassword: "",
    error: false
  });

  const handleChange = e =>
    setFormData(R.merge(formData, { [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();

    const { email, password, repassword } = formData;

    if (
      validator.isEmpty(email) ||
      validator.isEmpty(password) ||
      validator.isEmpty(repassword)
    ) {
      setFormData(R.merge(formData, { error: "All fields must be completed" }));
      return false;
    }

    if (!validator.isEmail(email)) {
      setFormData(R.merge(formData, { error: "Invalid email address" }));
      return false;
    }

    if (password !== repassword) {
      setFormData(R.merge(formData, { error: "Passwords don't match" }));
      return false;
    }

    setFormData(R.merge(formData, { error: false }));

    props.signUp(email, password);
  };

  return (
    <div className="formbox">
      <img src={logo} className="main-logo" alt="logo" />
      <h1>Sign up for an account</h1>
      <p>Enter your email choose a password</p>
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
        <input
          name="repassword"
          type="password"
          placeholder="confirm password"
          value={formData.repassword}
          onChange={handleChange}
        />
        <input type="submit" value="Sign Up" />
        {formData.error && <label className="error">{formData.error}</label>}
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  signUp
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
