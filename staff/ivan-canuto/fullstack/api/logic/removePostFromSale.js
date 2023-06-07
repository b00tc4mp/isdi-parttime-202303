const { readFile, writeFile } = require('fs')
const { validators: { validateId, validateCallback } } = require('com')

module.exports = function removePostFromSale(postId, callBack) {
  validateId(postId, 'post idi')
  validateCallback(callBack)

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

    if(!post.onSale || post.onSale === 'Sold') {
      callBack(new Error('Sorry, there must be an error.'))

      return
    }
    
    const postIndex = posts.indexOf(post)

    post.onSale = null

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