"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class guest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      guest.hasMany(models.favorite, { foreignKey: "guest_id" });
      guest.hasMany(models.booking, { foreignKey: "guest_id" });
      guest.hasMany(models.message, { foreignKey: "guest_id" });
    }
  }
  guest.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      description: DataTypes.TEXT,
      preferences: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "guest",
      underscored: true,
    }
  );
  return guest;
};
