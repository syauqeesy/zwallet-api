const path = require('path')
const Controller = require(path.join(__dirname, '../../core/Controller'))
const User = require(path.join(__dirname, '../controllers/User'))

const controller = new Controller()
const router = controller.modules.express.Router()
const user = new User()

const verifyToken = require(path.join(__dirname, '../middlewares/verifyToken'))
const upload = require(path.join(__dirname, '../middlewares/upload'))

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
  .get('/', [verifyToken], (req, res) => {
    user.search(req, res)
  })
  .patch('/:id', [verifyToken, upload], (req, res) => {
    user.update(req, res)
  })
