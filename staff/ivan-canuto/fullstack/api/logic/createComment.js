const { readFile, writeFile } = require('fs')
const { validators: { validateCallback, validateText } } = require('com')
const { validateId } = require('com/validators')

module.exports = (commentText, userId, postId, callBack) => {
  validateId(postId, 'post id')
  validateId(userId, 'user id')
  validateText(commentText, 'comment text')
  validateCallback(callBack)
  
  readFile(`${process.env.DB_PATH}/users.json`, (error, usersJSON) => {
    if(error) {
      callBack(error)

      return
    }

    const users = JSON.parse(usersJSON)
    const user = users.find(user => user.id === userId)

    if(!user) {
      callBack(new Error(`User with id ${userId} not found.`))

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
        callBack(new Error(`Post with id ${postId} not found.`))

        return
      }

      const postIndex = posts.indexOf(post)

      let id = 'comment-1'
      const lastComment = post.comments[post.comments.length - 1]
      if (lastComment) id = 'comment-' + (parseInt(lastComment.id.slice(8)) + 1)

      post.comments.push({
        author: user.name,
        authorId: user.id,
        text: commentText,
        id
      })

      posts.splice(postIndex, 1, post)

      const postToJSON = JSON.stringify(posts)

      writeFile(`${process.env.DB_PATH}/posts.json`, postToJSON, (error) => {
        if(error) {
          callBack(new Error(error))

          return
        }

        callBack(null)
      })
    })
  })
}