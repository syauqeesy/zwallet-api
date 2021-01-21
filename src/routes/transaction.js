const path = require('path')
const Controller = require(path.join(__dirname, '../../core/Controller'))
const Transaction = require(path.join(__dirname, '../controllers/Transaction'))

const controller = new Controller()
const router = controller.modules.express.Router()
const transaction = new Transaction()

const verifyToken = require(path.join(__dirname, '../middlewares/verifyToken'))

module.exports = router
  .post('/create/transfer', [verifyToken], (req, res) => {
    transaction.transfer(req, res)
  })
