// Connect with  mongoDB

// Good Practice ._.)/

const c = console.log,
  mongoose = require('mongoose'),
  config = require('../config')

class Database {
  constructor() {
    this.connect()
  }

  connect() {
    // return promise
    mongoose.connect(process.env.URL_DB, { useNewUrlParser: true })
      .then(() => c(`Successful connection: ${process.env.URL_DB}`))
      .catch(err => c(`Mistake connection: ${err.message}`))
  }
}

// Export an intance from my class Database
module.export = new Database()