const { validators: { validateId } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = function retrieveUserPosts(userId) {
  validateId(userId, 'user id')

  const { users, posts } = context

  return Promise.all([users.findOne({ _id: new ObjectId(userId)}), posts.find().toArray()])
    .then(([user, posts]) => {
      if(!user) throw new Error('User not found.')

      let userPosts = posts.filter(post => post.author.equals(user._id))
      
      userPosts.forEach(post => {
        const user = users.find(_user => _user._id.toString() === post.author.toString())

        post.author = {
          id: user._id,
          name: user.name,
          avatar: user.avatar,
          favs: user.favs
        }
      })
      console.log(userPosts)
      return userPosts.reverse()
    })
}