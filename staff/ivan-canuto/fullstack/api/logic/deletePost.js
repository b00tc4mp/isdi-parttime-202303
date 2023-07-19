const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

const { User, Post } = require('../data/models')

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

  // return Promise.all([User.find(), Post.findById(postId)])
  //   .then(([users, post]) => {
  //     const user = users.find(user => user.id === userId)
  //     if(!user) throw new ExistenceError('User not found.')

  //     if(!post) throw new ExistenceError('Post not found.')
      
  //     const modifiedUsers = []

  //     users.forEach(user => {
  //       if(user.favs.length) {
  //         const favsPost = user.favs.map(fav => fav.toString())

  //         if(favsPost.includes(post._id)) {
  //           let index = favsPost.findIndex(post._id)

  //           user.favs.splice(index, 1)

  //           modifiedUsers.push(user)
  //         }
  //       }
  //     })

  //     const updatedUsers = modifiedUsers.map(user => user.save())

  //     return Promise.all([...updatedUsers, Post.deleteOne({ _id: postId })])
  //   })
  //   .then(() => {})
}