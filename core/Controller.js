const path = require('path')
const Config = require(path.join(__dirname, '../core/Config'))

class Controller extends Config {
  constructor () {
    super()

    this.modules = {
      express: require('express'),
      Sequelize: require('sequelize'),
      cors: require('cors'),
      bcrypt: require('bcrypt'),
      jsonwebtoken: require('jsonwebtoken'),
      multer: require('multer'),
      fs: require('fs/promises')
    }

    this.models = {
      user: require(path.join(__dirname, '../src/models/User')),
      transaction: require(path.join(__dirname, '../src/models/Transaction')),
      transfer: require(path.join(__dirname, '../src/models/Transfer'))
    }
  }
}

module.exports = Controller
