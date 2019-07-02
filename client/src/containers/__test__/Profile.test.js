import React from "react";
import { mount } from "../../enzyme";
import { BrowserRouter } from "react-router-dom";
import { Profile } from "../Profile";

describe("Profile in tests", () => {
  const props = {
    auth: { error: false },
    updateUser: jest.fn()
  };

  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation(init => [init, setState]);

  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <Profile {...props} />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("first input chance", () => {
    const first = "first";

    const input = wrapper.find("input").at(0);
    input.instance().value = first;
    input.simulate("change");
    expect(input.instance().value).toBe(first);
  });

  it("last input chance", () => {
    const last = "last";

    const input = wrapper.find("input").at(1);
    input.instance().value = last;
    input.simulate("change");
    expect(input.instance().value).toBe(last);
  });

  it("nick input chance", () => {
    const nick = "nick";

    const input = wrapper.find("input").at(2);
    input.instance().value = nick;
    input.simulate("change");
    expect(input.instance().value).toBe(nick);
  });

  it("submit only when valid", () => {});
});
