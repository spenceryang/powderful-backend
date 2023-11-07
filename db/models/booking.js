"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      booking.belongsTo(models.guest, { foreignKey: "guest_id" });
      booking.belongsTo(models.property, { foreignKey: "property_id" });
      booking.hasMany(models.payment, { foreignKey: "booking_id" });
    }
  }
  booking.init(
    {
      guest_id: DataTypes.INTEGER,
      property_id: DataTypes.INTEGER,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      booking_status: DataTypes.STRING,
      payment_status: DataTypes.STRING,
      review_of_guest: DataTypes.INTEGER,
      review_of_property: DataTypes.INTEGER,
      comment_of_guest: DataTypes.STRING,
      comment_of_property: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "booking",
      underscored: true,
    }
  );
  return booking;
};
