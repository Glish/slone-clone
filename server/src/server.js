import * as R from "ramda";
import models from "./models";
import CONFIG from "./config/config";
import http from "http";
import express from "express";
import passport from "passport";
import cors from "cors";
import socketIO from "socket.io";
import socketIOJwt from "socketio-jwt";
import jwt from "jsonwebtoken";
import { to } from "./utils";
import routerV1 from "./routes/rest-v1";
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

const app = express();
const io = socketIO();
app.io = io;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use(cors());

app.use("/v1", routerV1);

app.use("/", (req, res) => {
  res.statusCode = 200; // send the appropriate status code
  res.json({ status: "success", message: "Slone Clone API", data: {} });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const server = http.createServer(app);
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

io.use(
  socketIOJwt.authorize({
    secret: CONFIG.jwtEncryption,
    handshake: true
  })
);

io.on("connection", socket => {
  socket.on("getUser", async req => {
    const [err, user] = await to(
      authService.getUser(socket.decoded_token.user_id)
    );

    if (err) {
      socket.emit("error", err);
    } else {
      socket.emit("getUser", { user });
    }
  });

  socket.on("updateUser", async req => {
    const [err, user] = await to(
      authService.updateUser(socket.decoded_token.user_id, req.data)
    );

    if (err) {
      socket.emit("error", err);
    } else {
      socket.emit("updateUser", { user });
    }
  });

  socket.on("getChannels", async req => {
    const [err, channels] = await to(channelService.getChannels());

    if (err) {
      socket.emit("error", err);
    } else {
      socket.emit("getChannels", { channels });
    }
  });

  socket.on("createChannel", async req => {
    const [err, channel] = await to(channelService.createChannel(req.data));

    if (err) {
      socket.emit("error", err);
    } else {
      socket.emit("createChannel", channel);
    }
  });

  socket.on("joinChannel", async req => {
    const [err, user] = await to(
      authService.getUser(socket.decoded_token.user_id)
    );

    if (err) {
      socket.emit("error", err);
    } else {
      if (socket.room) socket.leave(socket.room);
      socket.join(`channel ${req.data}`);
      socket.room = req.data;

      const joinMessage = "joined channel";

      const [messageErr, message] = await to(
        messageService.createMessage(
          req.data,
          socket.decoded_token.user_id,
          joinMessage
        )
      );

      if (messageErr) {
        socket.emit("error", messageErr);
      } else {
        const [channelErr, channel] = await to(
          channelService.getChannel(req.data)
        );

        if (channelErr) {
          socket.emit("error", channelErr);
        } else {
          socket.emit("joinChannel", channel);
        }
      }
    }
  });

  socket.on("createMessage", async req => {
    const [err, message] = await to(
      messageService.createMessage(
        socket.room,
        socket.decoded_token.user_id,
        req.data.message
      )
    );

    if (err) {
      socket.emit("error", error);
    } else {
      // io.in(socket.room).emit("createMessage", req.data);
      // io.in(socket.room).emit("createMessage", req.data);
      // socket.emit("createMessage", req.data);
      io.sockets.in(socket.room).emit("createMessage", req.data);
    }
  });

  socket.on("error", err => {});
});
