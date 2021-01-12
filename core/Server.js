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

  run () {
    this.listen()
  }
}

module.exports = Server
