const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

require('dotenv').config()
const users = require("./api/users");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = `mongodb://mongo:${process.env.MONGO_PORT}/users`;

// Connect to MongoDB
mongoose.connect(db, {
    "auth": { "authSource": "admin" },
    "user": process.env.MONGO_USER,
    "pass": process.env.MONGO_PASS,
    "useMongoClient": true
  })
  .then(() => console.log("MongoDB successfully connected to Users"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api", users);
const User = require('./models/User')

app.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.find({}, (err, documents) => {
    if (err) res.status(404).json({err: 'Unable to fetch users.'})
    else{
      let users = documents.map(doc => {
        return {
          _id: doc._id,
          name: doc.name,
          username: doc.username,
          role: doc.role,
          color: doc.color
        }
      })
      res.status(200).json(users)
    }
  })
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Users Service up and running on port ${port}`))