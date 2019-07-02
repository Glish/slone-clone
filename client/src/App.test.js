import React from "react";
import { shallow, mount, debug } from "./enzyme";
import { App } from "./App";

describe("Sign in tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("render signup", () => {
    let props = {
      auth: { error: false }
    };

    const wrapper = shallow(<App {...props} />);
  });
});
