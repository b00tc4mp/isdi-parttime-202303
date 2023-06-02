const { readFile, writeFile } = require('fs')

module.exports = function updatePost(userId, postId, imageUrl, postText, callBack) {


  readFile('./data/users.json', 'utf8', (error, usersJSON) => {
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
    
    readFile('./data/posts.json', 'utf8', (error, postsJSON) => {
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

      writeFile('./data/posts.json', postsToJSON, 'utf8', (error) => {
        if(error) {
          callBack(error)

          return
        }

        callBack(null)
      })
    })
  })
}