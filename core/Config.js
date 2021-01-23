require('dotenv').config()
class Config {
  constructor () {
    // Server configuration
    this.PORT = process.env.PORT
    this.BASE_URL = process.env.BASE_URL
    this.CLIENT_BASE_URL = process.env.CLIENT_BASE_URL

    // Application configuration
    this.SECRET_KEY = process.env.SECRET_KEY
    this.MAIL_USER = process.env.MAIL_USER
    this.MAIL_PASSWORD = process.env.MAIL_PASSWORD
  }
}

module.exports = Config
