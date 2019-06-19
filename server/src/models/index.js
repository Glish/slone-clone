import * as R from "ramda";
import Sequelize from "sequelize";
import CONFIG from "../config/config";

import userModel from "./user.model";
import channelModel from "./channel.model";

const sequelize = new Sequelize(
  CONFIG.dbName,
  CONFIG.dbUser,
  CONFIG.dbPassword,
  {
    host: CONFIG.dbHost,
    dialect: CONFIG.dbDialect,
    port: CONFIG.dbPort
  }
);

const models = {
  User: userModel.init(sequelize, Sequelize),
  Channel: channelModel.init(sequelize, Sequelize)
};

Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

const db = {
  ...models,
  sequelize
};

export default db;
