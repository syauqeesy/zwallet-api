const path = require('path')
const Controller = require(path.join(__dirname, '../../core/Controller'))
const controller = new Controller()

const storage = controller.modules.multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images')
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    return callback(null, true)
  }

  req.res.status(400).json({
    status: 'Failed',
    message: 'Avatar must be an image!'
  })
}

module.exports = controller.modules.multer({ storage, fileFilter, limits: { fileSize: 1500000 } })
