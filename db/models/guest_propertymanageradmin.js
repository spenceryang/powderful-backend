'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class guest_propertymanageradmin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  guest_propertymanageradmin.init({
    guest_id: DataTypes.INTEGER,
    propertymanager_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'guest_propertymanageradmin',
  });
  return guest_propertymanageradmin;
};