const { readFile, writeFile } = require('fs')
const { validators: { validateId } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = (postId, commentId) => {
  validateId(postId, 'post id')
  validateId(commentId, 'comment id')

  const { posts } = context

  return posts.findOne({ _id: new ObjectId(postId) })
    .then(post => {
      if(!post) throw new Error('Post not found.')

      return posts.updateOne(
        { _id: new ObjectId(postId) },
        { $pull: { comments: { id: commentId }}}
      )
    })
  
  // readFile(`${process.env.DB_PATH}/posts.json`, (error, postsJSON) => {
  //   if(error) {
  //     callBack(error)

  //     return
  //   }

  //   const posts = JSON.parse(postsJSON)
  //   const post = posts.find(_post => _post.id === postId)

  //   if(!post) {
  //     callBack(new Error('Post not found.'))

  //     return
  //   }

  //   const comments = post.comments
  //   const commentIndex = comments.findIndex(_comment => _comment.id === commentId)

  //   if(commentIndex === -1) {
  //     callBack(new Error('Comment not found.'))

  //     return
  //   }

  //   comments.splice(commentIndex, 1)

  //   const postIndex = posts.findIndex(_post => _post.id === postId)
  //   posts.splice(postIndex, 1, post)

  //   const postToJSON = JSON.stringify(posts)

  //   writeFile(`${process.env.DB_PATH}/posts.json`, postToJSON, (error) => {
  //     if(error) {
  //       callBack(error)

  //       return
  //     }

  //     callBack(null)
  //   })
  // })
}