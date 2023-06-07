const { readFile, writeFile } = require('fs')
const { validators: { validateId, validateText, validateCallback } } = require('com')


function setPostPrice(postId, postPrice, callBack) {
  validateId(postId, 'post id')
  validateText(postPrice)
  validateCallback(callBack)

  readFile('./data/posts.json', (error, postsJSON) => {
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

    writeFile('./data/posts.json', postsToJSON, (error) => {
      if(error) {
        callBack(error)

        return
      }

      callBack(null)
    })
  })
}

function unsetPostPrice(postId, callBack) {

  readFile('./data/posts.json', (error, postsJSON) => {
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

    writeFile('./data/posts.json', postsToJSON, (error) => {
      if(error) {
        callBack(error)

        return
      }

      callBack(null)
    })
  })
}

module.exports = {
  setPostPrice,
  unsetPostPrice
}