const authenticateUser = require('../logic/authenticateUser')
const jwt = require('jsonwebtoken')
const { handleErrors } = require('./helpers')
require('dotenv').config()

module.exports = handleErrors((req, res) => {
  const { email, password } = req.body

  return authenticateUser(email, password)
    .then(userId => {
      const payload = { sub: userId }

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION })

      res.json(token)
    })    
})