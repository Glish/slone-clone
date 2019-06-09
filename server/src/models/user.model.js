import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import bcryptPromise from 'bcrypt-promise';
import jwt from 'jsonwebtoken';
import { ThrowError, to } from '../services/util.service';
import CONFIG from '../config/config';

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
          validate: { isEmail: { msg: 'Email is invalid.' } },
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
          validate: {
            len: { args: [7, 20], msg: 'Phone number invalid, too short.' },
            isNumeric: { msg: 'Phone number is invalid.' },
          },
        },
        password: DataTypes.STRING,
      },
      {
        sequelize,
        hooks: {
          // eslint-disable-next-line no-unused-vars
          beforeSave: async (user, opts) => {
            let err;
            if (user.changed('password')) {
              let salt;
              let hash;
              [err, salt] = await to(bcrypt.genSalt(10));

              if (err) {
                ThrowError(err.message, true);
              }

              [err, hash] = await to(bcrypt.hash(user.password, salt));

              if (err) {
                ThrowError(err.message, true);
              }

              // eslint-disable-next-line no-param-reassign
              user.password = hash;
            }
          },
        },
      },
    );
  }

  async comparePassword(pw) {
    if (!this.password) {
      ThrowError('password not set');
    }

    const [err, pass] = await to(bcryptPromise.compare(pw, this.password));
    if (err) {
      ThrowError(err);
    }

    if (!pass) {
      ThrowError('invalid password');
    }

    return this;
  }

  toWeb() {
    const json = this.toJSON();
    return json;
  }

  getJWT() {
    const expirationTime = parseInt(CONFIG.jwtExpiration, 10);
    return `Bearer ${jwt.sign({ user_id: this.id }, CONFIG.jwtEncryption, {
      expiresIn: expirationTime,
    })}`;
  }
}

export default User;
