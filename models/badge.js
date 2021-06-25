'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class badge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      badge.belongsToMany(models.user, {
        through: 'user_badge'
      })
    }
  };
  badge.init({
    clickNum: DataTypes.INTEGER,
    carbonReduction: DataTypes.INTEGER,
    badgeInfo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'badge',
  });
  return badge;
};