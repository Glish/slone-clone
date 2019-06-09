import Sequelize from 'sequelize';
import { ThrowError, to } from '../services/util.service';
import CONFIG from '../config/config';

class Channel extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
      },
    );
  }

  toWeb() {
    const json = this.toJSON();
    return json;
  }
}

export default Channel;
