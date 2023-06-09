const { readFile } = require('fs')
const { validators: { validateId, validateCallback } } = require('com')
require('dotenv').config()

module.exports = (userId, callBack) => {
  validateId(userId, 'user id')
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
    
    let _user = {
      name: user.name,
      avatar: user.avatar,
      favs: user.favs
    }

    callBack(null, _user)
  })
}