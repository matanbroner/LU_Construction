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
                console.log("THERE WAS AN ERROR")
                if(response.body === 'Unauthorized')
                    callback(false)
                else callback(true)
                }
                else {
                    console.log(error)
                    callback(false)
                }
          })
    }
}

module.exports = authenticate