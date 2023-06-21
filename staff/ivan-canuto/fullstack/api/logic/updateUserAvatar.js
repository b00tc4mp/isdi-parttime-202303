require('dotenv').config()

const { readFile, writeFile } = require('fs')
const { validators: { validateId, validatePassword, validateUrl, validateCallback } } = require('com')

module.exports = (userId, newAvatarUrl, password, callBack) => {
  validateId(userId, 'user id')
  validateUrl(newAvatarUrl, 'new avatar url')
  validatePassword(password)
  validateCallback(callBack)

  readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
    if(error) {
      callBack(error)

      return
    }

    const users = JSON.parse(json)

    const user = users.find(_user => _user.id === userId)

    if(!user) {
      callBack(new Error('User does not exist.'))

      return
    }
    
    if(newAvatarUrl === user.avatar) {
      callBack(new Error('New avatar is the same as the old one.'))
      
      return
    }

    if(user.password !== password) {
      callBack(new Error('Incorrect password.'))

      return
    }

    user.avatar = newAvatarUrl
    const indexUser = users.findIndex(_user => _user.id === userId)

    users.splice(indexUser, 1, user)

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