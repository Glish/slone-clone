import React from "react";
import { connect } from "react-redux";
import channelReducer from "../reducers/ChannelReducer";

const Loading = props => {
  return (
    <div
      className={`loading-holder ${
        props.auth || props.channel ? "show" : "hide"
      }`}
    >
      <div className="loading">
        <div className="horizontal" />
        <div className="vertical" />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth.isLoading,
  channel: state.channel.isLoading
});

export default connect(mapStateToProps)(Loading);

export { Loading };
