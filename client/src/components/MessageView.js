import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ChannelModel from "../components/ChannelModel";
// import { getChannels } from "../actions/channelActions";
import * as R from "ramda";

const MessageView = props => {
  const [channelModel, setChannelModel] = useState(false);

  useEffect(() => {
    // props.getAllChannels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const MessageListing = () => {
    return <div className="message-listing" />;
  };

  const MessageField = () => <input className="message-field" type="text" />;

  return (
    <div className="message-view">
      <MessageListing />
      <MessageField />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  channel: state.channel
});

const mapDispatchToProps = {
  // getAllChannels
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageView);
