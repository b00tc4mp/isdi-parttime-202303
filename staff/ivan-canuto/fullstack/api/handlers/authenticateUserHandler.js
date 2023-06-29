const authenticateUser = require('../logic/authenticateUser')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res) => {
  try {
    const { email, password } = req.body
  
    authenticateUser(email, password)
      .then(userId => {
        const payload = { sub: userId }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION })

        res.json(token)
      })
      .catch(error => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}