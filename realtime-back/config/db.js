const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env' })

const conectarDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    console.log('DB Conected')
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}

module.exports = conectarDb
