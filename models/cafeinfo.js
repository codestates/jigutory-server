'use strict';
const { STRING } = require('sequelize');
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
    latitude: DataTypes.DOUBLE,
    longitude : DataTypes.DOUBLE,
    address: DataTypes.STRING,
    type:DataTypes.STRING,
    telephone:DataTypes.STRING,
    etc:DataTypes.STRING,
    link:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'cafeinfo',
  });
  return cafeinfo;
};