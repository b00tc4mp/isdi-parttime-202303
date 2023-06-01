const { readFile } = require('fs')

module.exports = function authenticateUser(email, password, callBack) {


  readFile('./data/users.json', 'utf8', (error, json) => {
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