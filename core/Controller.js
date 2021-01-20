const path = require('path')
const Config = require(path.join(__dirname, '../core/Config'))

class Controller extends Config {
  constructor () {
    super()

    this.modules = {
      express: require('express'),
      Sequelize: require('sequelize'),
      cors: require('cors'),
      bcrypt: require('bcrypt')
    }

    this.models = {
      user: require(path.join(__dirname, '../src/models/User'))
    }
  }
}

module.exports = Controller
