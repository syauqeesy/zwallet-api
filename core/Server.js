const path = require('path')
const Controller = require(path.join(__dirname, '../core/Controller'))

class Server extends Controller {
  constructor () {
    super()

    this.app = this.modules.express()
  }

  listen () {
    this.app.listen(this.PORT, () => {
      console.log(`Server running on port ${this.PORT}`)
    })
  }

  run (callback) {
    this.listen()
    this.app.use(this.modules.cors())
    this.app.use(this.modules.express.json())
    this.app.use(this.modules.express.urlencoded({ extended: false }))
    this.app.use('/images', this.modules.express.static('images'))
    this.app.use('/api/users', require(path.join(__dirname, '../src/routes/user')))
    this.app.use('/api/transactions', require(path.join(__dirname, '../src/routes/transaction')))
    callback()
  }
}

module.exports = Server
