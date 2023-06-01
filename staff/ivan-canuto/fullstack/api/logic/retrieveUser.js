const { readFile } = require('fs')

module.exports = function retrieveUser(userId, callBack) {


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
    
    let _user = {
      name: user.name,
      avatar: user.avatar,
      favs: user.favs
    }

    callBack(null, _user)
  })
}