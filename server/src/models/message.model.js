import Sequelize from "sequelize";
import CONFIG from "../config/config";

class Message extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        message: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        sequelize
      }
    );
  }

  static associate(models) {
    this.myAssociation = this.belongsTo(models.Channel);
    this.myAssociation = this.belongsTo(models.User);
  }

  toWeb() {
    const json = this.toJSON();
    return json;
  }
}

export default Message;
