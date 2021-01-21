const path = require('path')
const Server = require(path.join(__dirname, 'core/Server'))
// const Controller = require(path.join(__dirname, 'core/Controller'))
const { Model } = require(path.join(__dirname, 'core/Model'))

// const controller = new Controller()
const server = new Server()
const model = new Model()
const db = model.initialize()

server.run(async () => {
  try {
    await db.authenticate()
    console.log('Database connected')
  } catch (error) {
    console.log(error)
  }
})
