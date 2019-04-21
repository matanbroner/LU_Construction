const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')

require('dotenv').config()

mongoose.connect('mongodb://mongo:' + process.env.MONGO_PORT + '/testimonials')
  .catch(err => {
    console.log(err)
  })

var app = express()

app.use(express.json());

const Testimonial = require('./models/Testimonial')

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

var api = require('./utils/api')
var estimate = require('./utils/estimate')

app.use('/api', api)
app.use('/estimate', estimate)

app.get('/all', function(req, res){
  Testimonial.find({approved: true}, (err, data) => {
    if (err) res.status(404).json({badFetch: "Unable to fetch testimonials"})
    else res.json(data)
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

var port = 5200
app.listen(port, () => console.log(`Testimonials Service listening on port ${port}`))