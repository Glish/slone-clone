import React from "react";
import { shallow, mount, debug } from "../../enzyme";
import { Loading } from "../Loading";

describe("Loading bar tests", () => {
  it("show loading", () => {
    const props = {
      auth: { isLoading: true },
      channel: { isLoading: true }
    };

    const wrapper = mount(<Loading {...props} />);
    expect(wrapper.find(".loading-holder").hasClass("show")).toEqual(true);
  });

  it("hide loading", () => {
    const props = {
      auth: { isLoading: false },
      channel: { isLoading: false }
    };

    const wrapper = mount(<Loading {...props} />);
    expect(wrapper.find(".loading-holder").hasClass("show")).toEqual(true);
  });
});
