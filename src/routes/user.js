const path = require('path')
const Controller = require(path.join(__dirname, '../../core/Controller'))
const User = require(path.join(__dirname, '../controllers/User'))

const controller = new Controller()
const router = controller.modules.express.Router()
const user = new User()

const verifyToken = require(path.join(__dirname, '../middlewares/verifyToken'))

module.exports = router
  .post('/register', (req, res) => {
    user.register(req, res)
  })
  .post('/login', (req, res) => {
    user.login(req, res)
  })
  .get('/:id', [verifyToken], (req, res) => {
    user.getById(req, res)
  })
