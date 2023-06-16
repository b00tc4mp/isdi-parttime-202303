const { validators: { validateId, validateText, validateCallback } } = require('com')
const { readFile, writeFile } = require('fs')

module.exports = (postId, postPrice, callBack) => {
  validateId(postId, 'post id')
  validateText(postPrice)
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

    post.onSale = postPrice

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