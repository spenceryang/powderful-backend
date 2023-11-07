"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class maintenance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      maintenance.belongsTo(models.property, { foreignKey: "property_id" });
    }
  }
  maintenance.init(
    {
      description: DataTypes.TEXT,
      scheduled_date: DataTypes.DATE,
      status: DataTypes.STRING,
      property_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "maintenance",
      underscored: true,
    }
  );
  return maintenance;
};
