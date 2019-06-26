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

console.log("Environment:", CONFIG.app);

models.sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to SQL database:", CONFIG.dbName);
  })
  .catch(err => {
    console.error("Unable to connect to SQL database:", CONFIG.dbName, err);
  });
if (CONFIG.app === "dev") {
  models.sequelize.sync(); // creates table if they do not already exist
  // models.sequelize.sync({ force: true }); // deletes all tables then recreates them - for testing
}
const io = socketIO();
const server = http.createServer();
io.attach(server);

const onError = error => {
  if (error.syscall !== "listen") {
    throw new Error(error);
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`LISTENING ON: ${bind}`);
};

const port = parseInt(process.env.PORT);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

io.on("connection", socket => {
  socket.use((packet, next) => {
    if (packet[0] === "login" || packet[0] === "error") next();

    if (socket.handshake.query && socket.handshake.query.token) {
      jwt.verify(socket.handshake.query.token, CONFIG.jwtEncryption, function(
        err,
        decoded
      ) {
        if (err) socket.emit("unauthorized");
        socket.decoded_token = decoded;
        next();
      });
    }

    socket.emit("unauthorized");
  });

  socket.on("login", async req => {
    const [err, auth] = await to(authService.authUser(req.data));
    if (err) return socket.emit("error", err);

    socket.emit("login", auth);
  });

  socket.on("signup", async req => {
    const [err, auth] = await to(authService.createUser(req.data));
    if (err) return socket.emit("error", err);

    socket.emit("signup", auth);
  });

  socket.on("getUser", async req => {
    const [err, user] = await to(
      authService.getUser(socket.decoded_token.user_id)
    );
    if (err) return socket.emit("error", err);

    socket.emit("getUser", { user });
  });

  socket.on("updateUser", async req => {
    const [err, user] = await to(
      authService.updateUser(socket.decoded_token.user_id, req.data)
    );
    if (err) return socket.emit("error", err);

    socket.emit("updateUser", { user });
  });

  socket.on("getChannels", async req => {
    const [err, channels] = await to(channelService.getChannels());
    if (err) return socket.emit("error", err);

    socket.emit("getChannels", { channels });
  });

  socket.on("createChannel", async req => {
    const [err, channel] = await to(channelService.createChannel(req.data));
    if (err) return socket.emit("error", err);

    socket.emit("createChannel", channel);
  });

  socket.on("joinChannel", async req => {
    console.log("DECODED::", socket.decoded_token);
    const [userErr, user] = await to(
      authService.getUser(socket.decoded_token.user_id)
    );
    if (userErr) return socket.emit("error", err);

    let [channelErr, channel] = await to(channelService.getChannel(req.data));
    if (channelErr) return socket.emit("error", channelErr);

    if (socket.room) socket.leave(socket.room);
    socket.join(channel.id);
    socket.room = channel.id;

    const joinMessage = "joined channel";

    const [messageErr, message] = await to(
      messageService.createMessage(
        req.data,
        socket.decoded_token.user_id,
        joinMessage
      )
    );
    if (messageErr) return socket.emit("error", messageErr);

    [channelErr, channel] = await to(channelService.getChannel(req.data));
    if (channelErr) return socket.emit("error", channelErr);

    socket.emit("joinChannel", channel);
  });

  socket.on("createMessage", async req => {
    const [err, message] = await to(
      messageService.createMessage(
        socket.room,
        socket.decoded_token.user_id,
        req.data.message
      )
    );

    if (err) return socket.emit("error", error);
    io.sockets.in(socket.room).emit("createMessage", message);
  });

  socket.on("error", err => {});
});
