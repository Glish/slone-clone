import React from "react";
import { shallow } from "../../enzyme";
import Dashboard from "../Dashboard";

describe("Dashboard list tests", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Dashboard />);
  });

  it("render subcomponents", () => {
    expect(wrapper.find("Connect(ChannelList)").length).toEqual(1);
    expect(wrapper.find("Connect(MessageView)").length).toEqual(1);
  });
});
