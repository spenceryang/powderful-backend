"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      property.hasMany(models.favorite, { foreignKey: "property_id" });
      property.hasMany(models.maintenance, { foreignKey: "property_id" });
      property.hasMany(models.property_assets, {
        foreignKey: "property_id",
      });
      property.hasMany(models.booking, { foreignKey: "property_id" });
      property.belongsTo(models.propertymanager, {
        foreignKey: "propertymanager_id",
      });
    }
  }
  property.init(
    {
      propertymanager_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      propertytype: DataTypes.STRING,
      configuration: DataTypes.STRING,
      floorsize: DataTypes.STRING,
      address: DataTypes.TEXT,
      amenities: DataTypes.STRING,
      roomrate: DataTypes.INTEGER,
      coordinates: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "property",
      underscored: true,
    }
  );
  return property;
};
