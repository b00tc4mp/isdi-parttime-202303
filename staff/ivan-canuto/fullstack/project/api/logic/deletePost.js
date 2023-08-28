const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')

const { User, Post } = require('../data/models')

/**
 * Deletes a post
 * 
 * @param {string} userId The user id 
 * @param {string} postId The post id
 * 
 * @returns {Promise} A Promise that resolves when a post is deleted successfully, or rejects with an error message if deletion fails
 * 
 * @throws {TypeError} On non-string user id or post id
 * @throws {ContentError} On user id or post id length not equal to 24 characters
 * @throws {ExistenceError} On non-existing user or post
 */

module.exports = (userId, postId) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')

  return (async () => {
    const users = await User.find()

    const user = users.find(user => user.id === userId)
    if(!user) throw new ExistenceError('User not found.')

    const post = await Post.findById(postId)
    if(!post) throw new ExistenceError('Post not found.')

    const modifiedUsers = []

    users.forEach(user => {
      if(user.favs.length) {
        const favsPost = user.favs.map(fav => fav.toString())

        if(favsPost.includes(post._id)) {
          let index = favsPost.findIndex(post._id)

          user.favs.splice(index, 1)

          modifiedUsers.push(user)
        }
      }
    })

    const updatedUsers = modifiedUsers.map(user => user.save())

    await Promise.all([...updatedUsers, Post.deleteOne({ _id: postId })])
  })()
}