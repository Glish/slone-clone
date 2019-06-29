import models from "../models";
import { to } from "../utils";

// eslint-disable-next-line consistent-return
export const createChannel = async name => {
  if (name.length > 0) {
    const [err, channel] = await to(models.Channel.create({ name }));
    if (err) throw new Error("channel with that name already exists");

    return channel.toWeb();
  }

  throw new Error("A valid channel name entered.");
};

export const getChannels = async () => {
  const [err, channels] = await to(models.Channel.findAll());
  if (err) throw new Error("Failed to get all channels.");

  const [channelErr, selectedChannel] = await to(getChannel(1));
  if (err) throw new Error("Failed to find default channel");

  return { channels, selectedChannel };
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
  if (err) throw new Error("Failed to get channel");

  return channel.toWeb();
};
