import models from "./models";
import CONFIG from "./config/config";
import http from "http";
import socketIO from "socket.io";
const io = socketIO();

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

const server = http.createServer();
io.attach(server);

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
};

const port = parseInt(process.env.PORT);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
