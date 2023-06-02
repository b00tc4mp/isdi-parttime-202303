const { readFile, writeFile } = require('fs')

module.exports = function toggleVisibilityPost(postId, callBack) {
  readFile('./data/posts.json', 'utf8', (error, postsJSON) => {
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

    writeFile('./data/posts.json', postsToJSON, 'utf8', (error) => {
      if(error) {
        callBack(error)

        return
      }

      callBack(null)
    })
  })
}