import React from "react";
import { shallow } from "../../enzyme";
import { ChannelList } from "../ChannelList";
import { ChannelModel } from "../ChannelModel";

describe("Channel list tests", () => {
  const props = {
    channel: {
      channels: [
        {
          id: 1,
          name: "channel1"
        },
        {
          id: 2,
          name: "channel2"
        },
        {
          id: 3,
          name: "channel3"
        }
      ],
      selectedChannel: {
        id: 1
      }
    },
    joinChannel: jest.fn(),
    logOut: jest.fn()
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ChannelList {...props} />);
  });

  it("renders channel list", () => {
    expect(wrapper.find("ul")).toBeDefined();
    expect(wrapper.find("li")).toHaveLength(props.channel.channels.length + 1);
  });

  it("renders correct channel name", () => {
    expect(
      wrapper
        .find("li")
        .at(1)
        .contains(`# ${props.channel.channels[0].name}`)
    ).toBe(true);
  });

  it("renders correct channel active", () => {
    expect(
      wrapper
        .find("li")
        .at(1)
        .hasClass("active")
    ).toBe(true);
  });

  it("validate channel click", () => {
    wrapper
      .find("li")
      .at(1)
      .simulate("click", {});

    expect(props.joinChannel.mock.calls.length).toEqual(1);
    expect(props.joinChannel).toHaveBeenCalledWith(
      props.channel.channels[0].id
    );
  });

  it("validate logout click", () => {
    wrapper
      .find(".logout")
      .at(0)
      .simulate("click", {});

    expect(props.logOut.mock.calls.length).toEqual(1);
    expect(props.logOut).toHaveBeenCalledWith({});
  });

  it("render model toggle", () => {
    expect(wrapper.find("Connect(ChannelModel)").length).toEqual(0);
    wrapper.find("button.add").simulate("click", {});
    expect(wrapper.find("Connect(ChannelModel)").length).toEqual(1);
  });
});
