const { validators: { validateId } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = function retrieveUserPosts(userId) {
  validateId(userId, 'user id')

  const { users, posts } = context

  return Promise.all([users.find().toArray(), posts.find().toArray()])
    .then(([users, posts]) => {
      const user = users.find(_user => _user._id.toString() === userId)
      if(!user) throw new Error('User not found.')

      let userPosts = posts.filter(post => post.author.equals(user._id))
      
      userPosts.forEach(post => {
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

      return userPosts.reverse()
    })
}