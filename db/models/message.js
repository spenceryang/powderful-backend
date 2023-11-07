"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      message.belongsTo(models.guest, { foreignKey: "guest_id" });
      message.belongsTo(models.propertymanager, {
        foreignKey: "propertymanager_id",
      });
    }
  }
  message.init(
    {
      content: DataTypes.TEXT,
      guest_id: DataTypes.INTEGER,
      propertymanager_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "message",
      underscored: true,
    }
  );
  return message;
};
