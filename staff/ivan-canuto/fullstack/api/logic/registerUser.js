const { readFile, writeFile } = require('fs')
const { validators: { validateName, validateEmail, validatePassword, validateCallback } } = require('com')
require('dotenv').config()

module.exports = (name, email, password, callBack) => {
  validateName(name)
  validateEmail(email)
  validatePassword(password)
  validateCallback(callBack)

  readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
    if(error) {
      callBack(error)

      return
    }

    const users = JSON.parse(json)

    let user = users.find(_user => _user.email === email)

    if(user) {
      callBack(new Error(`User with email ${email} already exists.`))

      return
    }

    let id = 'user-1'

    const lastUser = users[users.length-1]
    if(lastUser) id = `user-${parseInt(lastUser.id.slice(5)) + 1}`
    
    if(password.length < 6) {
      callBack(new Error('The password is too short.'))
      return
    }

    user = {
      id,
      name,
      email,
      password,
      avatar: 'data:image/png;base64,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',
      favs: []
    }

    users.push(user)
    
    const usersJSON = JSON.stringify(users)

    writeFile(`${process.env.DB_PATH}/users.json`, usersJSON, (error) => {
      if(error) {
        callBack(error)

        return
      }

      callBack(null)
    })
  })
}