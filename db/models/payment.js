"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      payment.belongsTo(models.booking, { foreignKey: "booking_id" });
    }
  }
  payment.init(
    {
      booking_id: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      payment_date: DataTypes.DATE,
      payment_type: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "payment",
      underscored: true,
    }
  );
  return payment;
};
