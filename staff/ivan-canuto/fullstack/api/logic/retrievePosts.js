const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = (userId) => {
  validateId(userId, 'user id')

  const { users, posts } = context

  return Promise.all([users.findOne({ _id: new ObjectId(userId) }), posts.find().toArray()])
    .then(([user, posts]) => {
      if(!user) throw new ExistenceError('User not found.')

      const authors = posts.reduce((authors, { author }) => authors.add(author.toString()), new Set)
      
      return users.find({ _id: { $in: Array.from(authors).map(id => new ObjectId(id))}}).toArray()
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
