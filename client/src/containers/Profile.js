import React, { useState } from "react";
import { connect } from "react-redux";
import logo from "../images/logoalt.svg";
import { updateUser } from "../actions/authActions";
import * as R from "ramda";

const Profile = props => {
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    nick: ""
  });

  const handleChange = e => {
    setFormData(R.merge(formData, { [e.target.name]: e.target.value }));
    console.log(formData);
  };

  const handleSubmit = e => {
    props.updateUser(formData);
    e.preventDefault();
  };

  return (
    <div className="formbox">
      <img src={logo} className="main-logo" alt="logo" />
      <h1>Complete your profile</h1>
      <p>Enter your name and choose a nickname</p>
      <form onSubmit={handleSubmit}>
        <input
          name="first"
          type="text"
          placeholder="firstname"
          value={formData.first}
          onChange={handleChange}
        />
        <input
          name="last"
          type="text"
          placeholder="lastname"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          name="nick"
          type="text"
          placeholder="nickname"
          value={formData.nick}
          onChange={handleChange}
        />
        <input type="submit" value="Continue" />
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  updateUser
};

export default connect(
  null,
  mapDispatchToProps
)(Profile);
