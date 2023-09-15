const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req) => {
  const { authorization } = req.headers
  const token = authorization.slice(7)

  const payload = jwt.verify(token, process.env.JWT_SECRET)

  const { sub: userId } = payload

  return userId
}