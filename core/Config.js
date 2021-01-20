require('dotenv').config()
class Config {
  constructor () {
    // Server configuration
    this.PORT = process.env.PORT
    this.BASE_URL = process.env.BASE_URL
    this.SECRET_KEY = process.env.SECRET_KEY
  }
}

module.exports = Config
