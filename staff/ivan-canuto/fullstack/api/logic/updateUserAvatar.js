const { readFile, writeFile } = require('fs')
const { validators: { validateId, validatePassword, validateText, validateCallback } } = require('com')

module.exports = function updateUserAvatar(userId, newAvatarUrl, password, callBack) {
  validateId(userId, 'user id')
  validateText(newAvatarUrl)
  validatePassword(password)
  validateCallback(callBack)

  readFile('./data/users.json', 'utf8', (error, json) => {
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

    writeFile('./data/users.json', usersJSON, 'utf8', (error) => {
      if(error) {
        callBack(error)

        return
      }

      callBack(null)
    })
  })
}