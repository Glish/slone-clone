import models from "../models";

import { to } from "../utils";

// eslint-disable-next-line consistent-return
export const createMessage = async message => {
  /*
  let err;
  let message;

  if (message.length > 0) {
    [err, message] = await to(models.Message.create({ name }));
    if (err) throw "channel with that name already exists";

    return message.toWeb();
  }
  */
  // throw "A valid channel was not entered.";
};

export const getMessages = async () => {
  const [err, messages] = await to(models.Message.findAll());
  if (err) throw "Failed to get all messages.";

  return messages;
};
