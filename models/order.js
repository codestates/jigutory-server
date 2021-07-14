'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order.belongsToMany(models.product, {
        through: 'order_product',
      })
      order.belongsTo(models.user, {
        foreignKey: 'userId'
      })
    }
  };
  order.init({
    location: DataTypes.STRING,
    message: DataTypes.STRING,
    totalPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};