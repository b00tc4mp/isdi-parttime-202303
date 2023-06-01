const { readFile, writeFile } = require('fs')

module.exports = function updateUserAvatar(userId, password, newPassword, newPasswordConfirm, callBack) {


  readFile('./data/users.json', 'utf8', (error, json) => {
    if(error) {
      callBack(error)

      return
    }

    const users = JSON.parse(json)

    const user = users.find(_user => _user.id === userId)

    if(!user) {
      callBack(new Error('User not found.'))

      return
    }

    if(user.password !== password) {
      callBack(new Error('Incorrect password.'))

      return
    }

    if(user.password === newPassword) {
      callBack(new Error('The new password is the same as the old one.'))
    }

    if(newPassword.length < 6) {
      callBack(new Error('The new password is too short.'))

      return
    }

    if(newPassword !== newPasswordConfirm) {
      callBack(new Error('The new passwords do not match.'))

      return
    }

    user.password = newPassword

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