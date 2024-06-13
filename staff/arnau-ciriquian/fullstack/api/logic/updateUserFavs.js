const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
const { User, Post } = require('../data/models')

/**
 * Checks and updates all favorite post of one user in case some have been deleted by their owners
 * 
 * @param {string} userId User id
 * 
 * @returns 
 * 
 * @throws {TypeError} On non-string user id
 * @throws {ExistenceError} On non-existing user
 */
module.exports = (userId) => {
  validateId(userId, 'user id')

  return User.findById(userId)
    .then(user => {
      if (!user) throw new ExistenceError('user not found')

      const favs = user.favs

      favs.map(_postId => {
        return Post.findById(_postId)
          .then(post => {
            if (!post) {
              const index = favs.findIndex((objectId) => objectId.equals(_postId))

              favs.splice(index, 1)

              return User.updateOne({ '_id': userId }, { 'favs': favs })
            }
          })
      })
    })
}