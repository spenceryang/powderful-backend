"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class property_assets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      property_assets.belongsTo(models.property, { foreignKey: "property_id" });
    }
  }
  property_assets.init(
    {
      property_id: DataTypes.INTEGER,
      file_link: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "property_assets",
      underscored: true,
    }
  );
  return property_assets;
};
