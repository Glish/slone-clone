import models from "../models";

import { to } from "../utils";

// eslint-disable-next-line consistent-return
export const createChannel = async name => {
  let err;
  let channel;

  if (name.length > 0) {
    [err, channel] = await to(models.Channel.create({ name }));
    if (err) throw "channel with that name already exists";

    return channel.toWeb();
  }

  throw "A valid channel was not entered.";
};

export const getChannels = async () => {
  const [err, channels] = await to(models.Channel.findAll());
  if (err) throw "Failed to get all channels.";

  return channels;
};

export const getChannel = async id => {
  const [err, channel] = await to(
    models.Channel.findByPk(id, {
      include: [
        {
          model: models.Message
        }
      ]
    })
  );
  if (err) throw "Failed to get channel";

  return channel.toWeb();
};
