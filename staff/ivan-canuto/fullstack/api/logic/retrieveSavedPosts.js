const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
const { User, Post } = require('../data/models')

module.exports = (userId) => {
  validateId(userId, 'user id')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')
    
    const posts = await Post.find({ _id: { $in: user.favs} }).populate('author', '-favs -__v').lean()

    posts.forEach(post => {
      post.id = post._id.toString()
      delete post._id

      post.fav = user.favs.some(fav => fav.toString() === post.id)
      post.liked = post.likes.some(like => like.toString() === user.id)

      if(post.author._id) {
        post.author.id = post.author._id.toString()
        delete post.author._id
      }
    })

    return posts.reverse()
  })()

  // return User.findById(userId)
  //   .then((user) => {
  //     if(!user) throw new ExistenceError('User not found.')

  //     return Post.find({ _id: { $in: user.favs} }).populate('author', '-favs -__v').lean()
  //       .then(posts => {
  //         posts.forEach(post => {
  //           post.id = post._id.toString()
  //           delete post._id

  //           post.fav = user.favs.some(fav => fav.toString() === post.id)
  //           post.liked = post.likes.some(like => like.toString() === user.id)

  //           if(post.author._id) {
  //             post.author.id = post.author._id.toString()
  //             delete post.author._id
  //           }
  //         })

  //         return posts.reverse()
  //       })
  //   })
}