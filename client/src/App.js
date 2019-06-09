import React from "react";
import { connect } from "react-redux";
import logo from "./images/logoalt.svg";
import "./styles/App.scss";

const App = () => {
  return (
    <div className="App">
      <h1>GOT HERE</h1>
    </div>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
