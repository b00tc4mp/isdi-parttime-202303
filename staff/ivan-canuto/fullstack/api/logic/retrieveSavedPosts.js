const { validators: { validateId } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = (userId) => {
  validateId(userId, 'user id')

  const { users, posts } = context

  return users.findOne({ _id: new ObjectId(userId) })
  .then(user => {
    if(!user) throw new Error('User not found.')

    return Promise.all([posts.find().toArray(), users.find().toArray()])
      .then(([posts, users]) => {
        let savedPosts = posts.filter(post => user.favs.includes(post._id.toString()))
        
            savedPosts.forEach(post => {
              const user = users.find(_user => _user._id.toString() === post.author.toString())

              post.author = {
                id: user._id,
                name: user.name,
                avatar: user.avatar,
                favs: user.favs
              }
            })
        return savedPosts.reverse()
      })
  })
}