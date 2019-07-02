import models from "../models";
import { to } from "../utils";

// eslint-disable-next-line consistent-return
export const createMessage = async (ChannelId, UserId, messageText) => {
  if (messageText.length > 0) {
    const [createErr, createMessage] = await to(
      models.Message.create({ ChannelId, UserId, message: messageText })
    );
    if (createErr) throw new Error(err);

    const [err, message] = await to(
      models.Message.findByPk(createMessage.id, {
        include: [{ all: true, nested: true }]
      })
    );
    if (err) throw new Error(err);

    return message.toWeb();
  }
};

export const getMessages = async () => {
  const [err, messages] = await to(models.Message.findAll());
  if (err) throw new Error("Failed to get all messages.");

  return messages;
};
