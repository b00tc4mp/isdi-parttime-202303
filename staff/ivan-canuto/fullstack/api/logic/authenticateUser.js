const { readFile } = require('fs')
const { validators: { validateEmail, validatePassword, validateCallback } } = require('com')
require('dotenv').config()

module.exports = (email, password, callBack) => {
  validateEmail(email)
  validatePassword(password)
  validateCallback(callBack)

  readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
    if(error) {
      callBack(error)

      return
    }

    const users = JSON.parse(json)
    const user = users.find(_user => _user.email === email)

    if(!user) {
      callBack(new Error(`User with email ${email} does not exist`))

      return
    }

    if(user.password !== password) {
      callBack(new Error('Incorrect password.'))

      return
    }

    callBack(null, user.id)
  })
}