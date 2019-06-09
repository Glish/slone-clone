import dotenv from "dotenv";

dotenv.config();

const CONFIG = {};

CONFIG.app = process.env.APP || "dev";
CONFIG.port = process.env.PORT || "9000";

CONFIG.dbDialect = process.env.DB_DIALECT || "mysql";
CONFIG.dbHost = process.env.DB_HOST || "localhost";
CONFIG.dbPort = process.env.DB_PORT || "3306";
CONFIG.dbName = process.env.DB_NAME || "name";
CONFIG.dbUser = process.env.DB_USER || "root";
CONFIG.dbPassword = process.env.DB_PASSWORD || "db-password";

CONFIG.jwtEncryption = process.env.JWT_ENCRYPTION || "jwt_please_change";
CONFIG.jwtExpiration = process.env.JWT_EXPIRATION || "10000";

export default CONFIG;
