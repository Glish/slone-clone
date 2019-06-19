import React, { useState } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { createChannel } from "../actions/channelActions";

const ChannelModel = props => {
  const [name, setName] = useState("");

  const handleChange = e => {
    let value = e.target.value;
    if (value.length > 0 && !R.startsWith("#", value)) {
      value = `#${e.target.value}`;
    }

    setName(R.trim(value));
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.createChannel(name.substr(1));
  };

  return (
    <div className="model">
      <button className="close" onClick={props.toggle}>
        <span>x</span>
        esc
      </button>
      <div className="formbox">
        <h1>Create a channel</h1>
        <p>
          Channels are where your members communicate. They are best organized
          around a topic - #leads, for example
        </p>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="# e.g. leads"
            value={name}
            onChange={handleChange}
          />

          <input type="submit" value="Create Channel" />
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  createChannel
};

export default connect(
  null,
  mapDispatchToProps
)(ChannelModel);
