const path = require('path')
const Controller = require(path.join(__dirname, '../../core/Controller'))

const controller = new Controller()

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({
        status: 'Failed',
        message: 'Access denied'
      })
    }

    const token = authHeader.split(' ')[1]

    const verified = controller.modules.jsonwebtoken.verify(token, controller.SECRET_KEY)
    res.user = verified
    return next()
  } catch (error) {
    res.status(401).json({
      status: 'Failed',
      message: 'Access denied'
    })
  }
}
