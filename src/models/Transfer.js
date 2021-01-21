'use strict'
const path = require('path')
const { Model } = require('sequelize')
const Controller = require(path.join(__dirname, '../../core/Controller'))
const { development: config } = require(path.join(__dirname, '../../core/DatabaseConfig'))

const controller = new Controller()

const Transfer = (sequelize, DataTypes) => {
  class Transfer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate ({ Transaction, User }) {
      // define association here
      this.belongsTo(Transaction, { foreignKey: 'transactionId', as: 'transaction' })
      this.belongsTo(User, { foreignKey: 'userId', as: 'receiver' })
    }
  };
  Transfer.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    transactionId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Transfer'
  })
  return Transfer
}

module.exports = Transfer(new controller.modules.Sequelize(config.database, config.username, config.password, config), controller.modules.Sequelize.DataTypes)
