const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')

require('dotenv').config()

mongoose.connect('mongodb://mongo:' + process.env.MONGO_PORT + '/projects')
  .catch(err => {
    console.log(err)
  })

var app = express()

app.use(express.json());

var whitelist = [process.env.CLIENT_URL]
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

var api = require('./utils/api')

app.use('/api', api)

var port = 5100
app.listen(port, () => console.log(`Projects Service listening on port ${port}`))