"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class propertymanager extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      propertymanager.hasMany(models.property, {
        foreignKey: "propertymanager_id",
      });
      propertymanager.hasMany(models.message, {
        foreignKey: "propertymanager_id",
      });
      propertymanager.belongsToMany(models.guest, {
        through: "guest_propertymanageradmin",
        as: "guests",
        foreignKey: "propertymanager_id",
      });
    }
  }
  propertymanager.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
      description: DataTypes.TEXT,
      totalbookings: DataTypes.INTEGER,
      occupancyrate: DataTypes.INTEGER,
      revenue: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "propertymanager",
      underscored: true,
    }
  );
  return propertymanager;
};
