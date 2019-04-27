
const logout = () => {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('name')
}

module.exports.logout = logout