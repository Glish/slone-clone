import React from "react";
import { mount } from "../../enzyme";
import { BrowserRouter } from "react-router-dom";
import { SignIn } from "../SignIn";

describe("Sign in tests", () => {
  const props = {
    auth: { error: false },
    logIn: jest.fn()
  };

  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation(init => [init, setState]);

  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <SignIn {...props} />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("email input chance", () => {
    const email = "test@email.com";

    const input = wrapper.find("input").at(0);
    input.instance().value = email;
    input.simulate("change");
    expect(input.instance().value).toBe(email);
  });

  it("password input chance", () => {
    const password = "password";

    const input = wrapper.find("input").at(1);
    input.instance().value = password;
    input.simulate("change");
    expect(input.instance().value).toBe(password);
  });

  it("submit only when valid", () => {});
});
