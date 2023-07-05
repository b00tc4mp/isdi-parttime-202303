const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
const { User, Post } = require('mongoose')

module.exports = (userId) => {
  validateId(userId, 'user id')

  return Promise.all([User.find().toArray(), Post.find().toArray()])
    .then(([users, posts]) => {
      const user = users.find(_user => _user._id.toString() === userId)
      if(!user) throw new ExistenceError('User not found.')

      const favsFromUser = user.favs.map(fav => fav.toString())      

      let savedPosts = posts.filter(post => favsFromUser.includes(post._id.toString()))
      
        savedPosts.forEach(post => {
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

      return savedPosts.reverse()
    })
  }