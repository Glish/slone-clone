import React from "react";
import { shallow, mount, debug } from "../../enzyme";
import { ErrorBar } from "../ErrorBar";

describe("Error bar tests", () => {
  it("show error", () => {
    const props = {
      auth: { error: "error message" }
    };
    const wrapper = mount(<ErrorBar {...props} />);

    expect(wrapper.find(".server-error")).toHaveLength(1);
  });

  it("hide error", () => {
    const props = {
      auth: { error: false }
    };
    const wrapper = mount(<ErrorBar {...props} />);

    expect(wrapper.find(".server-error")).toHaveLength(0);
  });
});
