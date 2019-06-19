import * as R from "ramda";
import Sequelize from "sequelize";
import bcrypt from "bcrypt";
import bcryptPromise from "bcrypt-promise";
import jwt from "jsonwebtoken";
import { to } from "../utils";
import CONFIG from "../config/config";

class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        first: DataTypes.STRING,
        last: DataTypes.STRING,
        nick: DataTypes.STRING,
        email: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
          validate: { isEmail: { msg: "Email is invalid." } }
        },
        password: DataTypes.STRING
      },
      {
        sequelize,
        hooks: {
          // eslint-disable-next-line no-unused-vars
          beforeSave: async (user, opts) => {
            let err;
            if (user.changed("password")) {
              let salt;
              let hash;
              [err, salt] = await to(bcrypt.genSalt(10));

              if (err) {
                throw err.message;
              }

              [err, hash] = await to(bcrypt.hash(user.password, salt));

              if (err) {
                throw err.message;
              }

              user.password = hash;
            }
          }
        }
      }
    );
  }

  async comparePassword(pw) {
    if (!this.password) {
      throw new Error("password not set");
    }

    const [err, pass] = await to(bcryptPromise.compare(pw, this.password));
    if (err) {
      throw new Error(err);
    }

    if (!pass) {
      throw new Error("invalid password");
    }

    return this;
  }

  getJWT() {
    const expirationTime = parseInt(CONFIG.jwtExpiration, 10);

    return jwt.sign({ user_id: this.id }, CONFIG.jwtEncryption, {
      expiresIn: expirationTime
    });
  }

  toWeb() {
    const json = this.toJSON();
    return json;
  }
}

export default User;
