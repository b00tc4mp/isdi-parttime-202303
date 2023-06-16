const { readFile, writeFile } = require('fs')
const { validators: { validateId, validateCallback } } = require('com')

module.exports = (postId, callBack) => {
  validateId(postId, 'post id')
  validateCallback(callBack)

  readFile('./data/posts.json', (error, postsJSON) => {
    if(error) {
      callBack(error)

      return
    }

    const posts = JSON.parse(postsJSON)
    const post = posts.find(post => post.id === postId)

    if (!post) {
      callBack(new Error('Post not found.'))

      return
    }

    post.visible = !post.visible

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
}