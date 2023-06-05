const retrievePosts = require('./retrievePosts')
const { validators: { validateId, validateCallback } } = require('com')

module.exports = function retrievePost(userId ,postId, callBack) {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  validateCallback(callBack)

  retrievePosts(userId, (error, _posts) => {
    if (error) {
      callBack(error)

      return
    }

    const post = _posts.find(post => post.id === postId)
  
    callBack(null, post)
  })
}