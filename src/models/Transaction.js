'use strict'
const path = require('path')
const { Model } = require('sequelize')
const Controller = require(path.join(__dirname, '../../core/Controller'))
const { development: config } = require(path.join(__dirname, '../../core/DatabaseConfig'))

const controller = new Controller()

const Transaction = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate ({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', as: 'sender' })
    }

    toJSON () {
      return { ...this.get(), amount: parseInt(this.get('amount')) }
    }
  };
  Transaction.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    amount: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Transaction'
  })
  return Transaction
}

module.exports = Transaction(new controller.modules.Sequelize(config.database, config.username, config.password, config), controller.modules.Sequelize.DataTypes)
