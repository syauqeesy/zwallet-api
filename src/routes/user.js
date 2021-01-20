const path = require('path')
const Controller = require(path.join(__dirname, '../../core/Controller'))
const User = require(path.join(__dirname, '../controllers/User'))

const controller = new Controller()
const router = controller.modules.express.Router()
const user = new User()

module.exports = router
  .post('/register', (req, res) => {
    user.register(req, res)
  })
