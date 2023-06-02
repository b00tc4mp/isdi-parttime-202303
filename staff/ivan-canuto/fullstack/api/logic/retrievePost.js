// const { readFile, writeFile } = require('fs')
const retrievePosts = require('./retrievePosts')

module.exports = function retrievePost(userId ,postId, callBack) {


  retrievePosts(userId, (error, _posts) => {
    if (error) {
      callBack(error)

      return
    }

    const post = _posts.find(post => post.id === postId)
  
    callBack(null, post)
  })
}