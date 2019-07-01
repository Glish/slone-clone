import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Dashboard from "./containers/Dashboard";
import ErrorBar from "./components/ErrorBar";
import Loading from "./components/Loading";
import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";
import Profile from "./containers/Profile";
import { getUser } from "./actions/authActions";
import "./styles/App.scss";

const App = props => {
  useEffect(() => {
    checkAccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAccess = () => {
    const token = localStorage.getItem("token");

    if (token && token !== "undefined") {
      props.getUser();
    }
  };

  return (
    <Fragment>
      <ErrorBar />
      <Loading />
      <div className="App">
        <Router>
          <Switch>
            <PrivateRoute
              exact
              path="/"
              component={
                props.auth.user &&
                props.auth.user.nick &&
                props.auth.user.nick.length > 0
                  ? Dashboard
                  : Profile
              }
            />
            <PrivateRoute path="/profile" component={Profile} />
            <PublicRoute path="/signin" component={SignIn} />
            <PublicRoute path="/signup" component={SignUp} />
          </Switch>
        </Router>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = { getUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export { App };
