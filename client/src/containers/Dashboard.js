import React from "react";

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

export default Dashboard;
