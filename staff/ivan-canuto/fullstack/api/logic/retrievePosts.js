const { readFile } = require('fs')
const { validators: { validateId, validateCallback } } = require('com')

module.exports = (userId, callBack) => {
  validateId(userId, 'user id')
  validateCallback(callBack)

  readFile(`${process.env.DB_PATH}/users.json`, (error, usersJSON) => {
    if(error) {
      callBack(error)

      return
    }

    const users = JSON.parse(usersJSON)
    const user = users.find(_user => _user.id === userId)
    
    if(!user) {
      callBack(new Error('User not found.'))

      return
    }

    readFile(`${process.env.DB_PATH}/posts.json`, (error, postsJSON) => {
      if(error) {
        callBack(error)

        return
      }
      const posts = JSON.parse(postsJSON)

      posts.forEach(post => {

        const _user = users.find(user => user.id === post.author)
          
        post.author = {
          id: _user.id,
          name: _user.name,
          avatar: _user.avatar,
          favs: _user.favs
        }
      })
      
      callBack(null, posts.reverse());
      
    })
  })
}