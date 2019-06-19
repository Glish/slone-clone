import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PublicRoute = ({ component: Component, ...rest }) => {
  const { auth, ...passThrough } = rest;
  return (
    <Route
      {...rest}
      render={props =>
        !auth.isLoggedIn ? <Component {...passThrough} /> : <Redirect to="/" />
      }
    />
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PublicRoute);
