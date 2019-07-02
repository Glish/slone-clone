import * as actions from "../channelActions";
import { ActionTypes } from "../../utilities/channelValues";

describe("channel actions", () => {
  it("should create an getChannels action", () => {
    const expectedAction = {
      event: "getChannels",
      emit: true,
      handle: ActionTypes.CHANNELS_GET
    };

    expect(actions.getChannels()).toEqual(expectedAction);
  });

  it("should create an action to createChannel", () => {
    const name = "newchannel";

    const expectedAction = {
      event: "createChannel",
      emit: true,
      handle: ActionTypes.CHANNEL_CREATE,
      payload: { data: name }
    };

    expect(actions.createChannel(name)).toEqual(expectedAction);
  });

  it("should create an action to joinChannel", () => {
    const id = 1;

    const expectedAction = {
      event: "joinChannel",
      emit: true,
      handle: ActionTypes.CHANNEL_JOIN,
      payload: { data: id }
    };

    expect(actions.joinChannel(id)).toEqual(expectedAction);
  });

  it("should create an action to createMessage", () => {
    const message = "message";

    const expectedAction = {
      event: "createMessage",
      emit: true,
      handle: ActionTypes.CREATE_MESSAGE,
      payload: { data: { message } }
    };

    expect(actions.createMessage(message)).toEqual(expectedAction);
  });
});
