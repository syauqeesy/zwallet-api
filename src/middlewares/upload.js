const path = require('path')
const Controller = require(path.join(__dirname, '../../core/Controller'))
const controller = new Controller()
const fileHandler = require(path.join(__dirname, '../helpers/fileHandler')).single('avatar')

module.exports = (req, res, next) => {
  fileHandler(req, res, error => {
    if (error instanceof controller.modules.multer.MulterError) {
      return res.status(400).json({
        status: 'Failed',
        message: error.message
      })
    }

    if (error) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Internal server error'
      })
    }

    next()
  })
}
