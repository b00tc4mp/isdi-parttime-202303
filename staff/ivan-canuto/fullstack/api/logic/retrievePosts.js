const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
const { ObjectId } = require('mongodb')
const { User, Post } = require('../data/models')

module.exports = (userId) => {
  validateId(userId, 'user id')

  return Promise.all([User.findById(userId), Post.find()])
    .then(([user, posts]) => {
      if(!user) throw new ExistenceError('User not found.')

      const authors = posts.reduce((authors, { author }) => authors.add(author.toString()), new Set)
      
      return User.find({ _id: { $in: Array.from(authors).map(id => new ObjectId(id))}})
        .then(users => {
          posts.forEach(post => {
            post.id = post._id.toString()
            delete post._id

            const author = users.find(_user => _user._id.toString() === post.author.toString())

            const { _id, name, avatar } = author

            post.author = {
              id: _id.toString(),
              name: name,
              avatar: avatar,
            }

            post.fav = user.favs.some(fav => fav.toString() === post.id)
            post.liked = post.likes.some(like => like.toString() === userId)
          
          })

          return posts.reverse()
        })
    })
}
