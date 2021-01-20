'use strict'
const path = require('path')
const { Model } = require('sequelize')
const Controller = require(path.join(__dirname, '../../core/Controller'))
const { development: config } = require(path.join(__dirname, '../../core/DatabaseConfig'))

const controller = new Controller()

const User = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  };
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Your'
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Name'
    },
    avatar: {
      type: DataTypes.STRING(512),
      allowNull: false,
      defaultValue: 'user_default.jpg'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING(13),
      allowNull: false,
      defaultValue: '081212345678'
    },
    balance: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: '0'
    },
    securityPIN: {
      type: DataTypes.STRING(6),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User'
  })
  return User
}

module.exports = User(new controller.modules.Sequelize(config.database, config.username, config.password, config), controller.modules.Sequelize.DataTypes)
