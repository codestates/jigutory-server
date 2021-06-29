'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cafeinfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  cafeinfo.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    keyword: DataTypes.STRING,
    latitude: DataTypes.INTEGER,
    longitude : DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cafeinfo',
  });
  return cafeinfo;
};