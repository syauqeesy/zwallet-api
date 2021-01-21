const path = require('path')
const Controller = require(path.join(__dirname, '../../core/Controller'))

class Transaction extends Controller {
  async transfer (req, res) {
    try {
      const receiver = await this.models.user.findOne({ where: { id: req.body.receiver } })
      if (!receiver) {
        return res.status(404).json({
          status: 'Failed',
          message: 'Receiver not found!'
        })
      }

      const sender = await this.models.user.findOne({ where: { id: req.body.sender } })
      if (!sender) {
        return res.status(404).json({
          status: 'Failed',
          message: 'Sender not found!'
        })
      }

      if (receiver.id === sender.id) {
        return res.status(400).json({
          status: 'Failed',
          message: 'You can\'t transfer to yourself!'
        })
      }

      if (req.body.securityPIN !== sender.securityPIN) {
        return res.status(400).json({
          status: 'Failed',
          message: 'Security PIN wrong!'
        })
      }

      if (parseInt(sender.balance) - parseInt(req.body.amount) < 0) {
        return res.status(400).json({
          status: 'Failed',
          message: 'Your balance is not enough!'
        })
      }

      const transaction = await this.models.transaction.create({ userId: sender.id, amount: req.body.amount, type: 'Transfer' })
      await this.models.transfer.create({ transactionId: transaction.id, userId: receiver.id })

      await this.models.user.update({ balance: parseInt(sender.balance) - parseInt(req.body.amount) }, { where: { id: sender.id } })
      await this.models.user.update({ balance: parseInt(receiver.balance) + parseInt(req.body.amount) }, { where: { id: receiver.id } })

      return res.status(201).json({
        status: 'Success',
        message: 'Transfer success!'
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

module.exports = Transaction
