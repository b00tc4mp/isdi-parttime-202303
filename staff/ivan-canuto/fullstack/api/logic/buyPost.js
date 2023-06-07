const { readFile, writeFile } = require('fs')
const { validators: { validateCallback, validateId } } = require('com')

module.exports = function buyPost(postId, callBack) {
  validateId(postId)
  validateCallback(callBack)

  readFile('./data/posts.json', (error, postsJSON) => {
    if(error) {
      callBack(error)

      return
    }

    const posts = JSON.parse(postsJSON)

    const post = posts.find(_post => _post.id === postId)

    if(!post) {
      callBack(new Error('This post does not exist.'))

      return
    }
    else if(!post.onSale) {
      callBack(new Error('This post is not on sale.'))

      return
    }
    else if(post.onSale === 'Sold') {
      callBack(new Error('This post is already sold.'))

      return
    }
    
    const postIndex = posts.indexOf(post)
    
    posts.onSale = 'Sold'

    posts.splice(postIndex, 1, post)

    const postsToJSON = JSON.stringify(posts)

    writeFile('./data/posts.json', posts, (error) => {
      if(error) {
        callBack(error)
  
        return
      }

      callBack(null)
    })
  })
}