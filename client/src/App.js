import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Dashboard from "./containers/Dashboard";
import SignIn from "./containers/SignIn";
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
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute
            exact
            path="/"
            component={
              props.auth.user && props.auth.user.nick.length > 0
                ? Dashboard
                : Profile
            }
          />
          <PrivateRoute path="/profile" component={Profile} />
          <PublicRoute path="/signin" component={SignIn} />
        </Switch>
      </Router>
    </div>
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
