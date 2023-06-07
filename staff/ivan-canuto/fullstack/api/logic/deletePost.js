const { readFile, writeFile } = require('fs')
const { validators: { validateCallback, validateId } } = require('com')

module.exports = function deletePost(postId, userId, callBack) {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  validateCallback(callBack)

  readFile('./data/users.json', (error, usersJSON) => {
    if(error) {
      callBack(error)

      return
    }

    const users = JSON.parse(usersJSON)
    const user = users.find(_user => _user.id === userId)

    if(!user) {
      callBack('User not found.')
      
      return
    }

    const favPostIndex = user.favs.indexOf(postId)
    
    if(favPostIndex !== -1) {
      users.favs.splice(favPostIndex, 1)
      const usersToJSON = JSON.stringify(users)

      writeFile('./data/users.json', usersToJSON, (error) => {
        if(error) {
          callBack(error)

          return
        }
      })
    }
    else if(favPostIndex === -1) {
      const usersToJSON = JSON.stringify(users)
      writeFile('./data/users.json', usersToJSON, (error) => {
        if(error) {
          callBack(error)

          return
        }
      })
    }

    readFile('./data/posts.json', (error, postsJSON) => {
      if(error) {
        callBack(error)

        return
      }

      const posts = JSON.parse(postsJSON)
      const postIndex = posts.findIndex(_post => _post.id === postId)

      if(postIndex === -1) {
        callBack(new Error('Post not found'))

        return
      }

      posts.splice(postIndex, 1)

      const postsToJSON = JSON.stringify(posts)

      writeFile('./data/users.json', postsToJSON, (error) => {
        if(error) {
          callBack(error)

          return
        }

        callBack(null)
      })
    })
  })
}