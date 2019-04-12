
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')
const keys = require('./keys')

const options = {}
options.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken()
options.secretOrKey = process.env.SECRET_KEY

module.exports = passport => {
    passport.use(
      new JWTStrategy(options, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
          .then(user => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch(err => console.log(err));
      })
    );
  };