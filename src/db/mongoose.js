const mongoose = require('mongoose')
require('dotenv').config()

const connectionUrl = process.env.DB_URL

mongoose.connect(connectionUrl, { useNewUrlParser: true })
  .then(() => console.log('Successfully connected database'))
  .catch(error => console.log('Cannot connect to db',error))