import React from "react";
import { connect } from "react-redux";
import { error } from "../actions/authActions";

const ErrorBar = props => {
  if (props.auth.error)
    return (
      <div className="server-error">
        {props.auth.error}
        <button
          onClick={() => {
            props.error(false);
          }}
        >
          x
        </button>
      </div>
    );

  return null;
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = { error };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorBar);

export { ErrorBar };
