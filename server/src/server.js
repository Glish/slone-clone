import models from "./models";
import CONFIG from "./config/config";

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
