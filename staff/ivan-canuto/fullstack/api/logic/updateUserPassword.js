require('dotenv').config()

const { readFile, writeFile } = require('fs')
const { validators: { validateId, validatePassword, validateCallback } } = require('com')

module.exports = (userId, password, newPassword, newPasswordConfirm, callBack) => {
  validateId(userId, 'user id')
  validatePassword(password)
  validatePassword(newPassword, 'new password')
  validatePassword(newPasswordConfirm, 'new password confirm')
  validateCallback(callBack)

  if(newPassword.length < 6)
    throw new Error('The new password is too short.')

  if(newPassword !== newPasswordConfirm)
    throw new Error('The new passwords do not match.')

  readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
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

      return
    }

    user.password = newPassword

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