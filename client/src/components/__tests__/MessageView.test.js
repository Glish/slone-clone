import React from "react";
import { shallow, mount, debug } from "../../enzyme";
import { MessageView } from "../MessageView";

describe("Message view tests", () => {
  const props = {
    auth: { user: { nick: "nickname" } },
    channel: {
      name: "channelname"
    },
    members: [],
    messages: [
      { id: 1, message: "test message", createdAt: "2019-06-25T20:05:43.000Z" },
      {
        id: 2,
        message: "test message 2",
        createdAt: "2019-06-25T20:05:43.000Z"
      },
      {
        id: 3,
        message: "test message 3",
        createdAt: "2019-06-25T20:05:43.000Z"
      }
    ],
    createMessage: jest.fn()
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<MessageView {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders messages", () => {
    expect(wrapper.find("li")).toHaveLength(props.messages.length);
  });

  it("message input chance", () => {
    const message = "a new message";

    const input = wrapper.find("input.message-field").at(0);
    input.instance().value = message;
    input.simulate("change");
    expect(input.instance().value).toBe(message);
  });

  it("submit message only on enter", () => {
    const message = "message";
    const input = wrapper.find("input.message-field").at(0);

    input.simulate("keypress", { key: "Enter", target: { value: message } });
    expect(props.createMessage.mock.calls.length).toEqual(1);
    expect(props.createMessage).toHaveBeenCalledWith(message);
  });
});
