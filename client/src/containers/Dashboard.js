import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import ChannelList from "../components/ChannelList";
import MessageView from "../components/MessageView";

const Dashboard = props => {
  return (
    <div className="dashboard">
      <ChannelList />
      <MessageView />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
