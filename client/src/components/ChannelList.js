import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ChannelModel from "../components/ChannelModel";
import { getChannels, joinChannel } from "../actions/channelActions";
import * as R from "ramda";

const ChannelList = props => {
  const [channelModel, setChannelModel] = useState(false);

  useEffect(() => {
    props.getChannels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleChannelModel = () => {
    setChannelModel(!channelModel);
  };

  return (
    <div className="channel-list">
      <ul>
        <li>
          Channels
          <button className="add" onClick={toggleChannelModel}>
            +
          </button>
        </li>
        {props.channel &&
          props.channel.channels &&
          R.map(
            (channel, idx) => (
              <li
                id={channel.id}
                key={channel.id}
                className={
                  props.channel.selectedChannel &&
                  props.channel.selectedChannel.id === channel.id
                    ? "active"
                    : ""
                }
                onClick={() => props.joinChannel(channel.id)}
              >
                # {channel.name}
              </li>
            ),
            props.channel.channels
          )}
      </ul>
      {channelModel && <ChannelModel toggle={toggleChannelModel} />}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  channel: state.channel
});

const mapDispatchToProps = {
  getChannels,
  joinChannel
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelList);
