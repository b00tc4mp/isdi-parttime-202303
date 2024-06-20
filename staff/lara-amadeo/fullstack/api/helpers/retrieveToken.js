const extractToken = require('./extractToken')
const jwt = require('jsonwebtoken')

module.exports = function retrieveToken(req) {
    const token = extractToken(req)

    const payload = jwt.verify(token, process.env.SECRET)
    const { sub: userId } = payload
    return userId
}