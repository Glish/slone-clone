import React from "react";
import { shallow, mount } from "../../enzyme";
import { ChannelModel } from "../ChannelModel";

describe("Channel model tests", () => {
  const props = {
    createChannel: jest.fn(),
    toggle: jest.fn()
  };

  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation(init => [init, setState]);

  beforeEach(() => {
    wrapper = mount(<ChannelModel {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders channel model form", () => {
    expect(wrapper.find("form").length).toEqual(1);
  });

  it("channel input add/remove #", () => {
    const input = wrapper.find("input").at(0);

    input.instance().value = "#everything";
    input.simulate("change");
    expect(input.instance().value).toBe("#everything");

    input.instance().value = "everything";
    input.simulate("change");
    expect(input.instance().value).toBe("#everything");
  });

  it("validate form submit", () => {
    const form = wrapper.find("form").at(0);
    form.simulate("submit");

    expect(props.createChannel.mock.calls.length).toEqual(1);
    expect(props.toggle.mock.calls.length).toEqual(1);
  });
});
