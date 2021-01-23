const path = require('path')
const Controller = require(path.join(__dirname, '../../core/Controller'))
const mailSender = require(path.join(__dirname, '../helpers/mailSender'))

class User extends Controller {
  async register (req, res) {
    const { userName, email, password, securityPIN } = req.body
    try {
      const user = await this.models.user.findOne({ where: { email } })
      if (user) {
        return res.status(400).json({
          status: 'Failed',
          message: 'Email already used!'
        })
      }

      const salt = await this.modules.bcrypt.genSalt(10)
      const hashedPassword = await this.modules.bcrypt.hash(password, salt)

      let activationToken = ''
      const chars = '6q1w3e4r5t7y8u0i9opasdf41ghjklz2xcvbnm'

      for (let i = 0; i < 32; i++) {
        activationToken += chars.charAt(Math.floor(Math.random() * 37))
      }

      const result = await this.models.user.create({ userName, email, password: hashedPassword, securityPIN, activationToken })

      await mailSender(email, activationToken, result.id)

      return res.status(201).json({
        status: 'Success',
        message: 'Register success!',
        data: result
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        status: 'Failed',
        message: 'Internal server error'
      })
    }
  }

  async activate (req, res) {
    try {
      const user = await this.models.user.findOne({ where: { id: req.body.userId } })
      if (!user) {
        return res.status(404).json({
          status: 'Failed',
          message: 'User not found!'
        })
      }

      if (user.isActive !== 'inactive') {
        return res.status(400).json({
          status: 'Failed',
          message: 'Account is already active!'
        })
      }

      if (req.body.activationToken !== user.activationToken) {
        return res.status(400).json({
          status: 'Failed',
          message: 'Activation token wrong!'
        })
      }

      await this.models.user.update({ isActive: 'active' }, { where: { id: user.id } })
      return res.status(200).json({
        status: 'Success',
        message: 'Account activation success!'
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
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
      return res.status(200).json({
        status: 'Success',
        message: 'Login success!',
        data: {
          token,
          userId: result.id
        }
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        status: 'Failed',
        message: 'Internal server error'
      })
    }
  }

  async getById (req, res) {
    try {
      const result = await this.models.user.findOne({ where: { id: req.params.id } })
      if (!result) {
        return res.status(404).json({
          status: 'Failed',
          message: 'User not found!'
        })
      }

      return res.status(200).json({
        status: 'Success',
        message: 'User data fetched!',
        data: result
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        status: 'Failed',
        message: 'Internal server error'
      })
    }
  }

  async search (req, res) {
    const { Op } = this.modules.Sequelize
    try {
      const index = parseInt(req.query.page) || 1
      const numOfUsers = await this.models.user.findAll({
        where: {
          [Op.or]: [
            {
              firstName: {
                [Op.like]: `%${req.query.keyword || ''}%`
              }
            },
            {
              lastName: {
                [Op.like]: `%${req.query.keyword || ''}%`
              }
            },
            {
              phoneNumber: {
                [Op.like]: `%${req.query.keyword || ''}%`
              }
            },
            {
              email: {
                [Op.like]: `%${req.query.keyword || ''}%`
              }
            }
          ]
        }
      })

      const result = await this.models.user.findAll({
        where: {
          [Op.or]: [
            {
              firstName: {
                [Op.like]: `%${req.query.keyword || ''}%`
              }
            },
            {
              lastName: {
                [Op.like]: `%${req.query.keyword || ''}%`
              }
            },
            {
              phoneNumber: {
                [Op.like]: `%${req.query.keyword || ''}%`
              }
            },
            {
              email: {
                [Op.like]: `%${req.query.keyword || ''}%`
              }
            }
          ]
        },
        limit: 10,
        offset: index * 10 - 10
      })

      if (result.length < 1) {
        return res.status(404).json({
          status: 'Failed',
          message: 'User not found!'
        })
      }

      return res.status(200).json({
        status: 'Success',
        message: 'Users found!',
        data: result,
        dataPagination: {
          previous: index - 1 > 0 ? index - 1 : null,
          current: index,
          next: index + 1 <= Math.ceil(parseInt(numOfUsers.length) / 10) ? index + 1 : null
        }
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        status: 'Failed',
        message: 'Internal server error'
      })
    }
  }

  async update (req, res) {
    try {
      const user = await this.models.user.findOne({ where: { id: req.params.id } })
      if (!user) {
        return res.status(404).json({
          status: 'Failed',
          message: 'User not found!'
        })
      }

      let avatar = user.avatar
      if (req.file) {
        avatar = req.file.filename
        if (user.avatar !== 'user_default.jpg') {
          await this.modules.fs.unlink(path.join(__dirname, '../../images', user.avatar))
        }
      }

      let password = user.password
      if (req.body.password) {
        const passwordMatched = await this.modules.bcrypt.compare(req.body.currentPassword, user.password)
        if (!passwordMatched) {
          return res.status(400).json({
            status: 'Failed',
            message: 'Current password wrong!'
          })
        }

        const salt = await this.modules.bcrypt.genSalt(10)
        password = await this.modules.bcrypt.hash(req.body.password, salt)
      }

      let securityPIN = user.securityPIN
      if (req.body.securityPIN) {
        if (req.body.currentSecurityPIN !== securityPIN) {
          return res.status(400).json({
            status: 'Failed',
            message: 'Current security PIN wrong!'
          })
        }

        securityPIN = req.body.securityPIN
      }

      await this.models.user.update({
        firstName: req.body.firstName || user.firstName,
        lastName: req.body.lastName || user.lastName,
        avatar: avatar,
        password: password,
        phoneNumber: req.body.phoneNumber || user.phoneNumber,
        securityPIN: securityPIN
      },
      {
        where: {
          id: req.params.id
        }
      })

      return res.status(200).json({
        status: 'Success',
        message: 'User data updated!',
        data: {
          userId: user.id
        }
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        status: 'Failed',
        message: 'Internal server error'
      })
    }
  }
}

module.exports = User
