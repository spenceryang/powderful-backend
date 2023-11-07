"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      favorite.belongsTo(models.guest, { foreignKey: "guest_id" });
      favorite.belongsTo(models.property, { foreignKey: "property_id" });
    }
  }
  favorite.init(
    {
      guest_id: DataTypes.INTEGER,
      property_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "favorite",
      underscored: true,
    }
  );
  return favorite;
};
