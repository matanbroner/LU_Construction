const superagent = require('superagent');

const verifyIsAdmin = (callback) => {
    if (localStorage.getItem('jwtToken') === null)
        callback(false)
    else {
        return superagent
        .get('/service/users/api/auth')
        .set({'Authorization': localStorage.getItem('jwtToken')})
        .set('accept', 'json')
        .end((err, res) => {
            if (err || res.body.user.role !== 'Administrator') callback(false)
            else callback(res.body)
        })
    }
}

module.exports.verifyIsAdmin = verifyIsAdmin