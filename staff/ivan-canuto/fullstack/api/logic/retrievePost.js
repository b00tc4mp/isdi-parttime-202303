const retrievePosts = require('./retrievePosts')
const { validators: { validateId, validateCallback } } = require('com')
const { readFile } = require('fs')

module.exports = (userId ,postId, callBack) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  validateCallback(callBack)

  readFile(`${process.env.DB_PATH}/users.json`, (error, usersJSON) => {
    if(error) {
      callBack(error)

      return
    }

    const users = JSON.parse(usersJSON)
    const user = users.find(user => user.id === userId)
    
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
      const post = posts.find(post => post.id === postId)

      if(!post) {
        callBack(new Error('Post not found.'))

        return
      }

      const author = users.find(user => user.id === post.author)
        
      post.author = {
        id: author.id,
        name: author.name,
        avatar: author.avatar,
        favs: author.favs,
      }
      
      callBack(null, post)
    })
  })
}