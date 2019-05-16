const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')

require('dotenv').config()

const db = `mongodb://mongo:${process.env.MONGO_PORT}/projects`;

// Connect to MongoDB
mongoose.connect(db, {
    "auth": { "authSource": "admin" },
    "user": process.env.MONGO_USER,
    "pass": process.env.MONGO_PASS,
    "useMongoClient": true
  })
  .then(() => console.log("MongoDB successfully connected to Projects"))
  .catch(err => console.log(err));

var app = express()

app.use(express.json());

const Project = require('./models/Project')

var whitelist = [process.env.CLIENT_URL, process.env.AUTH_URL]
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// app.use(cors(corsOptions));

var api = require('./utils/api')

app.use('/api', api)

app.get('/all', function(req, res){
  Project.find({}, (err, projects) => {
    if (err) return res.status(404).json({badFetch: "Unable to fetch projects"})
    else res.json(projects)
  })
})

// GET ALL FEATURED PROJECTS
app.get('/featured', (req, res, next) => {
  Project.find({featured: true}, (err, projects) => {
      if (err) return res.status(404)
      if (!projects) return res.status(200).json([])
      else return res.status(200).json(projects)
  })
})

var port = 5100
app.listen(port, () => console.log(`Projects Service listening on port ${port}`))