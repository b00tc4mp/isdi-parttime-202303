const { validators: { validateId, validateCallback } } = require('com')
const { readFile, writeFile } = require('fs')

module.exports = function unsetPostPrice(postId, callBack) {
  validateId(postId, 'post Id')
  validateCallback(callBack)

  readFile(`${process.env.DB_PATH}/posts.json`, (error, postsJSON) => {
    if(error) {
      callBack(error)

      return
    }

    const posts = JSON.parse(postsJSON)
    const post = posts.find(post => post.id === postId)

    if(!post) {
      callBack(new Error('Sorry, the post does not exist.'))

      return
    }

    post.onSale = null

    const postIndex = posts.findIndex(post => post.id === postId)

    posts.splice(postIndex, 1, post)
    const postsToJSON = JSON.stringify(posts)

    writeFile(`${process.env.DB_PATH}/posts.json`, postsToJSON, (error) => {
      if(error) {
        callBack(error)

        return
      }

      callBack(null)
    })
  })
}