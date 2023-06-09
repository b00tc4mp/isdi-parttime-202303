const { readFile, writeFile } = require('fs')
const { validators: { validateId, validateUrl, validateText, validateCallback } } = require('com')

module.exports = function updatePost(userId, postId, imageUrl, postText, callBack) {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  validateUrl(imageUrl)
  validateText(postText)
  validateCallback(callBack)

  readFile(`${process.env.DB_PATH}/users.json`, (error, usersJSON) => {
    if(error) {
      callBack(error)

      return
    }

    const users = JSON.parse(usersJSON)
    const user = users.find(user => user.id === userId)

    if (!user) {
      callBack(new Error(`User not found.`))
      
      return
    }
    
    readFile('./data/posts.json', (error, postsJSON) => {
      if(error) {
        callBack(error)
  
        return
      }

      const posts = JSON.parse(postsJSON)
      const post = posts.find(post => post.id === postId)

      if (!post) {
        callBack(new Error(`Post with id ${postId} not found`))

        return
      }
    
      if (post.author !== userId) {
        callBack(new Error('There must be an error, this user is not the owner of the post.'))

        return
      }
    
      post.text = postText
      post.image = imageUrl
    
      const postIndex = posts.findIndex(_post => _post.id === postId)

      posts.splice(postIndex, 1, post)
      const postsToJSON = JSON.stringify(posts)

      writeFile('./data/posts.json', postsToJSON, (error) => {
        if(error) {
          callBack(error)

          return
        }

        callBack(null)
      })
    })
  })
}