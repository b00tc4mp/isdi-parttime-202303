const { validators: { validateName, validateEmail, validatePassword } } = require('com')
require('dotenv').config()
const context = require('./context')

module.exports = (name, email, password) => {
  validateName(name)
  validateEmail(email)
  validatePassword(password)

  const { users } = context

  return users.insertOne({ name, email, password })
}