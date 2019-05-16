var request = require('request')
const authenticate = (req, res, callback) => {

    if (!req.headers.authorization)
        callback(false)
    else {
        request({
            headers: {
              'Authorization': req.headers.authorization,
              'Content-Type': 'application/json'
            },
            uri: process.env.AUTH_URL,
            method: 'GET'
          }, function (error, response, body) {
            if (!error) {
                if(response.body === 'Unauthorized')
                    callback(false)
                else callback(true)
                }
                else {
                    console.log("There was an error in authenticating your JWT in the request body.")
                    console.log(error)
                    callback(false)
                }
          })
    }
}

module.exports = authenticate