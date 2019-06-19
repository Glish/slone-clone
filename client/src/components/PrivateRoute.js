import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth, ...passThrough } = rest;

  return (
    <Route
      {...rest}
      render={props =>
        auth.isLoggedIn ? (
          <Component {...passThrough} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
