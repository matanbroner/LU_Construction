
module.exports = {
    mongoURI: `mongodb://mongo:${process.env.MONGO_PORT}/users`,
    secretOrKey: process.env.SECRET_KEY
  };