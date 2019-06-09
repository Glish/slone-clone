import Sequelize from "sequelize";
import CONFIG from "../config/config";

class Channel extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        }
      },
      {
        sequelize
      }
    );
  }
}

export default Channel;
