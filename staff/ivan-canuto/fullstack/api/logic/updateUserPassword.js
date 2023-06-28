const { validators: { validateId, validatePassword } } = require('com')
require('dotenv').config()
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = (userId, password, newPassword, newPasswordConfirm) => {
  validateId(userId, 'user id')
  validatePassword(password)
  validatePassword(newPassword, 'new password')
  validatePassword(newPasswordConfirm, 'new password confirm')

  if(newPassword.length < 6)
    throw new Error('The new password is too short.')

  if(newPassword !== newPasswordConfirm)
    throw new Error('The new passwords do not match.')

  const { users } = context

  return users.findOne({ _id: new ObjectId(userId) })
    .then(user => {
      if(!user) throw new Error('User not found.')

      if(user.password !== password) throw new Error('Incorrect password.')
  
      if(user.password === newPassword) throw new Error('The new password is the same as the old one.')

      return users.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { password: newPassword }}
      )
    })

  // readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
  //   if(error) {
  //     callBack(error)

  //     return
  //   }

  //   const users = JSON.parse(json)

  //   const user = users.find(_user => _user.id === userId)

  //   if(!user) {
  //     callBack(new Error('User not found.'))

  //     return
  //   }

  //   if(user.password !== password) {
  //     callBack(new Error('Incorrect password.'))

  //     return
  //   }

  //   if(user.password === newPassword) {
  //     callBack(new Error('The new password is the same as the old one.'))

  //     return
  //   }

  //   user.password = newPassword

  //   const indexUser = users.findIndex(_user => _user.id === userId)

  //   users.splice(indexUser, 1, user)

  //   const usersJSON = JSON.stringify(users)

  //   writeFile(`${process.env.DB_PATH}/users.json`, usersJSON, (error) => {
  //     if(error) {
  //       callBack(error)

  //       return
  //     }

  //     callBack(null)
  //   })
  // })
}