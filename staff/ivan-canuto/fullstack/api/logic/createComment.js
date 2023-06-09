const { readFile, writeFile } = require('fs')
const { validators: { validateCallback, validateText } } = require('com')

module.exports = function createComment(commentText, userId, postId, callBack) {
  validateText(commentText)
  validateCallback(callBack)

  readFile(`${process.env.DB_PATH}/users.json`, (error, usersJSON) => {
    if(error) {
      callBack(error)

      return
    }

    const users = JSON.parse(usersJSON)

    const user = users.find(_user => _user.id === userId)

    readFile('./data/posts.json', (error, postsJSON) => {
      if(error) {
        callBack(error)
  
        return
      }

      const posts = JSON.parse(postsJSON)

      const post = posts.find(_post => _post.id === postId)

      if(!post) {
        callBack(new Error('Post not found.'))

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

      writeFile('./data/posts.json', postToJSON, (error) => {
        if(error) {
          callBack(error)

          return
        }

        callBack(null)
      })
    })
  })
}