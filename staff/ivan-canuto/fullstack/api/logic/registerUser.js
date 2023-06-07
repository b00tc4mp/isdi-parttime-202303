const { readFile, writeFile } = require('fs')
const { validators: { validateName, validateEmail, validatePassword, validateCallback } } = require('com')

module.exports = function registerUser(name, email, password, callBack) {
  validateName(name)
  validateEmail(email)
  validatePassword(password)
  validateCallback(callBack)

  readFile('./data/users.json', 'utf8', (error, json) => {
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
      avatar: null,
      favs: []
    }

    users.push(user)
    
    const usersJSON = JSON.stringify(users)

    writeFile('./data/users.json', usersJSON, 'utf8', (error) => {
      if(error) {
        callBack(error)

        return
      }

      callBack(null)
    })
  })
}