'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class badge extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            badge.belongsTo(models.user)
        }
    }

    badge.init(
        {
            clickNum: DataTypes.INTEGER,
            carbonReduction: DataTypes.INTEGER,
            levelNum: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'badge',
        },
    )
    return badge
}
