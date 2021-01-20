const path = require('path')
const Controller = require(path.join(__dirname, '../../core/Controller'))

class User extends Controller {
  async register (req, res) {
    const users = await this.models.user.findAll()

    res.send(users)
  }
}

module.exports = User
