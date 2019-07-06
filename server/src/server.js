import * as R from "ramda";
import models from "./models";
import CONFIG from "./config/config";
import http from "http";
import socketIO from "socket.io";
import jwt from "jsonwebtoken";
import { to } from "./utils";
import * as authService from "./services/authService";
import * as channelService from "./services/channel.service";
import * as messageService from "./services/message.service";
import { isObject } from "util";

console.log("Environment:", CONFIG.app);

/* configure DB */
models.sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to SQL database:", CONFIG.dbName);
  })
  .catch(err => {
    console.error("Unable to connect to SQL database:", CONFIG.dbName, err);
  });

if (CONFIG.app === "dev") {
  models.sequelize.sync();
  /* DON'T UNCOMMENT THE FOLLOWING LINE - unless testing, as deletes all tables then recreates them */
  /*
  models.sequelize.sync({ force: true }).then(() => {
    models.Channel.create({
      name: "general"
    });
  });
  */
}

/* create socket server */
const server = http.createServer();
const io = socketIO();
io.attach(server);

const port = parseInt(process.env.PORT);
server.listen(port);

/* socket io calls */
io.on("connection", socket => {
  /* middleware forces JWT authentication on all calls except on login and signup */
  socket.use(async (packet, next) => {
    try {
      // don't run jwt validation on login or signup
      if (packet[0] === "login" || packet[0] === "signup") return next();

      // validate all other calls with jwt token
      if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(
          socket.handshake.query.token,
          CONFIG.jwtEncryption,
          (err, decoded) => {
            if (err) return socket.emit("error", "unauthorized");
            socket.decoded = decoded;
          }
        );
      }

      // add user info to socket if does not already exist
      if (!socket.user) {
        const user = await authService.getUser(socket.decoded.user_id);
        socket.user = user;
      }

      return next();
    } catch (error) {
      socket.emit("error", error);
    }
  });

  socket.on("login", async req => {
    try {
      const auth = await authService.authUser(req.data);

      socket.user = auth.user;
      socket.emit("login", auth);
    } catch (error) {
      socket.emit("error", error);
    }
  });

  socket.on("signup", async req => {
    try {
      auth = await authService.createUser(req.data);
      socket.user = auth.user;
      socket.emit("signup", auth);
    } catch (error) {
      socket.emit("error", error);
    }
  });

  socket.on("getUser", async req => {
    try {
      socket.emit("getUser", { user: socket.user });
    } catch (error) {
      socket.emit("error", error);
    }
  });

  socket.on("updateUser", async req => {
    try {
      const user = await authService.updateUser(socket.user.id, req.data);

      if (err) return socket.emit("error", err);

      socket.user = user;
      socket.emit("updateUser", { user });
    } catch (error) {
      socket.emit("error", error);
    }
  });

  socket.on("getChannels", async req => {
    try {
      const channelsInfo = await channelService.getChannels();

      socket.emit("getChannels", {
        channels: channelsInfo.channels,
        selectedChannel: channelsInfo.selectedChannel
      });
    } catch (error) {
      socket.emit("error", error);
    }
  });

  socket.on("createChannel", async req => {
    try {
      const channel = await channelService.createChannel(req.data);

      socket.emit("createChannel", channel);
    } catch (error) {
      socket.emit("error", error);
    }
  });

  socket.on("joinChannel", async req => {
    try {
      const channel = await channelService.getChannel(req.data);
      const leaveRoom = socket.room;
      socket.leave(leaveRoom);

      io.sockets.in(leaveRoom).emit("userLeftChannel", { user: socket.user });

      const joinRoom = channel.id;
      socket.join(joinRoom);
      socket.room = joinRoom;

      const socketIds = io.sockets.adapter.rooms[socket.room]
        ? Object.keys(io.sockets.adapter.rooms[socket.room].sockets)
        : [];

      let channelUsers = R.map(clientId => {
        return io.sockets.connected[clientId].user;
      }, socketIds);

      socket.emit(
        "joinChannel",
        R.merge(channel, {
          selectedChannelMembers: channelUsers
        })
      );

      io.sockets
        .in(joinRoom)
        .emit("userJoinedChannel", { selectedChannelMembers: channelUsers });
    } catch (error) {
      socket.emit("error", error);
    }
  });

  socket.on("createMessage", async req => {
    try {
      const message = await to(
        messageService.createMessage(
          socket.room,
          socket.user.id,
          req.data.message
        )
      );

      io.sockets.in(socket.room).emit("messageCreated", { message });
    } catch (error) {
      socket.emit("error", error);
    }
  });

  socket.on("error", error => {
    socket.emit("serverError", isObject(error) ? error.message : error);
  });
});
