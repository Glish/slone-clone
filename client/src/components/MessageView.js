import React, { useState } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { createMessage } from "../actions/channelActions";
import ReactChatView from "react-chatview";
import * as R from "ramda";

const MessageView = props => {
  const [message, setMessage] = useState("");

  const ChannelMembers = () => {
    return (
      <header>
        <h1># {props.channel.name}</h1>
        <button>
          {`${props.members.length} active member${
            props.members.length !== 1 ? "s" : ""
          }`}
        </button>
      </header>
    );
  };

  const MessageListing = messages => {
    const calendarStrings = {
      lastDay: "[Yesterday at] LT",
      sameDay: "[Today at] LT",
      sameElse: "LLLL"
    };

    return (
      <ReactChatView
        reversed={true}
        flipped={true}
        className="message-listing"
        onInfiniteLoad={() => {}}
      >
        <ul>
          {R.map(
            (message, idx) => (
              <li key={message.id}>
                <h3>
                  <strong>{props.auth.user.nick} : </strong>
                  <Moment calendar={calendarStrings}>
                    {message.createdAt}
                  </Moment>
                </h3>
                {message.message}
              </li>
            ),
            props.messages
          )}
        </ul>
      </ReactChatView>
    );
  };

  const handleChange = e => {
    setMessage(e.target.value);
  };

  const handleSubmit = e => {
    if (e.key === "Enter") {
      props.createMessage(e.target.value);
    }
  };

  return (
    <div className="message-view">
      <ChannelMembers />
      <MessageListing
        messages={props.selectedChannel ? props.selectedChannel.messages : []}
      />
      <input
        className="message-field"
        onChange={handleChange}
        onKeyPress={handleSubmit}
        value={message}
        type="text"
      />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  channel: state.channel.selectedChannel ? state.channel.selectedChannel : {},
  messages: state.channel.selectedChannel
    ? state.channel.selectedChannel.Messages
    : [],
  members: state.channel.selectedChannelMembers
    ? state.channel.selectedChannelMembers
    : []
});

const mapDispatchToProps = {
  createMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageView);

export { MessageView };
