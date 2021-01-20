const path = require('path')
const Controller = require(path.join(__dirname, '../../core/Controller'))

class User extends Controller {
  async register (req, res) {
    const { userName, email, password, securityPIN } = req.body
    try {
      const salt = await this.modules.bcrypt.genSalt(10)
      const hashedPassword = await this.modules.bcrypt.hash(password, salt)
      const result = await this.models.user.create({ userName, email, password: hashedPassword, securityPIN })
      res.status(201).json({
        status: 'Success',
        message: 'Register success!',
        user: result
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        status: 'Failed',
        message: 'Internal server error'
      })
    }
  }

  async login (req, res) {
    const { email, password } = req.body
    try {
      const result = await this.models.user.findOne({ where: { email } })
      if (!result) {
        return res.status(400).json({
          status: 'Failed',
          message: 'Email unregistered!'
        })
      }

      const passwordMatched = await this.modules.bcrypt.compare(password, result.password)
      if (!passwordMatched) {
        return res.status(400).json({
          status: 'Failed',
          message: 'Password wrong!'
        })
      }

      const token = this.modules.jsonwebtoken.sign({ userId: result.id }, this.SECRET_KEY)
      res.status(200).json({
        status: 'Success',
        message: 'Login success!',
        data: {
          token,
          userId: result.id
        }
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        status: 'Failed',
        message: 'Internal server error'
      })
    }
  }
}

module.exports = User
