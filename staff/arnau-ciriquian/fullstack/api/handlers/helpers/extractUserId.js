const jwt = require('jsonwebtoken')

module.exports = (req) => {
    const { authorization } = req.headers
    const token = authorization.slice(7)

    const payload = jwt.verify(token, process.env.SECRET)

    const { sub: userId } = payload

    return userId
}